import { useMemo, useState } from 'react'

type Car = {
  id: number
  name: string
  type: string
  city: string
  price: number
  deposit: number
  seats: number
  transmission: string
  fuel: string
  image: string
  tag: string
  rating: string
}

type Booking = {
  id: string
  car: Car
  start: string
  end: string
  days: number
  status: 'Requested' | 'Approved' | 'Cancelled'
  createdAt: string
}

type Ticket = { id: string; topic: string; message: string; status: string }

const cars: Car[] = [
  {
    id: 1, name: 'Maruti Suzuki Baleno', type: 'Hatchback', city: 'Noida',
    price: 1699, deposit: 3000, seats: 5, transmission: 'Manual', fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85',
    tag: 'Easy city drive', rating: '4.8'
  },
  {
    id: 2, name: 'Hyundai Creta', type: 'SUV', city: 'Gurugram',
    price: 2799, deposit: 5000, seats: 5, transmission: 'Automatic', fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85',
    tag: 'Weekend favourite', rating: '4.9'
  },
  {
    id: 3, name: 'Tata Nexon', type: 'Compact SUV', city: 'Delhi',
    price: 2299, deposit: 4000, seats: 5, transmission: 'Manual', fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85',
    tag: 'Room for everyone', rating: '4.7'
  },
  {
    id: 4, name: 'Honda City', type: 'Sedan', city: 'Noida',
    price: 2199, deposit: 4000, seats: 5, transmission: 'Automatic', fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85',
    tag: 'Comfort drive', rating: '4.8'
  },
]

const money = (amount: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(amount)

function readSaved<T,>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [activeTab, setActiveTab] = useState<'Explore' | 'My bookings' | 'Trust centre'>('Explore')
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('All locations')
  const [sort, setSort] = useState('Recommended')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookings, setBookings] = useState<Booking[]>(() => readSaved('trustcar-bookings', []))
  const [tickets, setTickets] = useState<Ticket[]>(() => readSaved('trustcar-tickets', []))
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [ticketTopic, setTicketTopic] = useState('Booking or cancellation')
  const [ticketMessage, setTicketMessage] = useState('')
  const [notice, setNotice] = useState('')
  const [costOpen, setCostOpen] = useState<number | null>(null)

  const filteredCars = useMemo(() => {
    const matching = cars.filter(car => {
      const text = `${car.name} ${car.type} ${car.city}`.toLowerCase()
      return text.includes(query.toLowerCase()) && (city === 'All locations' || car.city === city)
    })
    if (sort === 'Price: low to high') return [...matching].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') return [...matching].sort((a, b) => b.price - a.price)
    return matching
  }, [query, city, sort])

  function saveBookings(next: Booking[]) {
    setBookings(next)
    localStorage.setItem('trustcar-bookings', JSON.stringify(next))
  }

  function saveTickets(next: Ticket[]) {
    setTickets(next)
    localStorage.setItem('trustcar-tickets', JSON.stringify(next))
  }

  function requestBooking(car: Car) {
    if (!startDate || !endDate) {
      setNotice('Choose both pickup and return dates to continue.')
      return
    }
    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T00:00:00')
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      setNotice('Return date must be the same as or later than pickup date.')
      return
    }
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1)
    const booking: Booking = {
      id: 'TC-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
      car, start: startDate, end: endDate, days, status: 'Requested',
      createdAt: new Date().toLocaleDateString('en-IN')
    }
    saveBookings([booking, ...bookings])
    setSelectedCar(null)
    setActiveTab('My bookings')
    setNotice('Demo booking request created. No real vehicle has been reserved.')
  }

  function cancelBooking(id: string) {
    saveBookings(bookings.map(booking => booking.id === id ? { ...booking, status: 'Cancelled' } : booking))
  }

  function submitTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ticketMessage.trim()) return
    const ticket: Ticket = {
      id: 'HELP-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
      topic: ticketTopic,
      message: ticketMessage.trim(),
      status: 'Open'
    }
    saveTickets([ticket, ...tickets])
    setTicketMessage('')
    setNotice('Demo support ticket created and saved in this browser.')
  }

  const navItems = [
    { label: 'Explore', icon: '⌕' },
    { label: 'My bookings', icon: '▤' },
    { label: 'Trust centre', icon: '◇' },
  ] as const

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setActiveTab('Explore')} aria-label="TrustCar home">
          <span className="brand-mark">T</span>
          <span><strong>trustcar</strong><small>INDIA · DEMO</small></span>
        </button>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <button key={item.label} className={activeTab === item.label ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab(item.label)}>
              <span className="nav-icon">{item.icon}</span>{item.label}
              {item.label === 'My bookings' && bookings.length > 0 && <span className="nav-count">{bookings.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">✳</span>
            <strong>Trust starts with clarity.</strong>
            <p>Know the estimated cost and record the car's condition before you go.</p>
            <button onClick={() => setActiveTab('Trust centre')}>Explore trust tools <span>↗</span></button>
          </div>
          <div className="profile-row"><div className="avatar">G</div><div><strong>Guest explorer</strong><small>Demo account</small></div><span className="dots">•••</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activeTab}</strong></div>
          <div className="topbar-right"><span className="demo-pill"><i /> Demo mode</span><button className="icon-button" onClick={() => setNotice('This is a local demo. Your test data stays in this browser.') } aria-label="Information">ⓘ</button></div>
        </header>

        {notice && <div className="notice" role="status"><span>ⓘ</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notice">×</button></div>}

        {activeTab === 'Explore' && (
          <section className="page">
            <div className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-dot" /> A CLEARER WAY TO HIT THE ROAD</div>
                <h1>Good trips begin<br />with <em>no surprises.</em></h1>
                <p>Compare demo cars, understand the estimated total, and keep a record of every step.</p>
                <div className="hero-points"><span>✓ Itemised estimates</span><span>✓ Clear booking status</span><span>✓ Handover checklist</span></div>
              </div>
              <div className="hero-visual">
                <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1100&q=85" alt="Car on an open road" />
                <div className="floating-note"><span className="note-icon">✓</span><span><strong>Cost breakdown</strong><small>See the estimate before requesting</small></span></div>
                <div className="hero-stamp"><span>DRIVE</span><b>WITH</b><span>CLARITY</span></div>
              </div>
            </div>

            <div className="section-heading">
              <div><div className="eyebrow muted">YOUR NEXT JOURNEY</div><h2>Explore demo cars</h2><p>Sample listings only — no real vehicles are available through this prototype.</p></div>
              <div className="result-count">{filteredCars.length} cars <span>in demo fleet</span></div>
            </div>

            <div className="filters">
              <label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cars, type or city..." /></label>
              <label className="select-wrap"><span>⌖</span><select value={city} onChange={e => setCity(e.target.value)}><option>All locations</option><option>Delhi</option><option>Noida</option><option>Gurugram</option></select></label>
              <label className="select-wrap sort-select"><span>↕</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>Price: low to high</option><option>Price: high to low</option></select></label>
            </div>

            <div className="car-grid">
              {filteredCars.map(car => (
                <article className="car-card" key={car.id}>
                  <div className="car-image"><img src={car.image} alt={car.name} loading="lazy" /><span className="car-tag">{car.tag}</span><button className="heart" aria-label="Save car" onClick={() => setNotice('Saved cars are a planned feature; this button is a demo.')}>♡</button></div>
                  <div className="car-body">
                    <div className="car-title-row"><div><h3>{car.name}</h3><p>{car.type} <span>·</span> {car.city}</p></div><div className="rating">★ {car.rating}</div></div>
                    <div className="specs"><span>♧ {car.seats} seats</span><span>⚙ {car.transmission}</span><span>◉ {car.fuel}</span></div>
                    <div className="price-row"><div><strong>{money(car.price)}</strong><span> / day</span><button className="cost-link" onClick={() => setCostOpen(costOpen === car.id ? null : car.id)}>{costOpen === car.id ? 'Hide breakdown' : 'View cost breakdown'} ⌄</button></div><button className="primary-button" onClick={() => { setSelectedCar(car); setNotice('') }}>View car <span>→</span></button></div>
                    {costOpen === car.id && <div className="cost-breakdown"><div><span>Daily rental estimate</span><strong>{money(car.price)}</strong></div><div><span>Platform / service fee</span><strong>{money(199)}</strong></div><div><span>Estimated subtotal / day</span><strong>{money(car.price + 199)}</strong></div><div><span>Refundable deposit (simulated)</span><strong>{money(car.deposit)}</strong></div><p>Taxes, insurance, fuel, tolls and actual availability are not verified. This is an illustrative estimate.</p></div>}
                  </div>
                </article>
              ))}
              {filteredCars.length === 0 && <div className="empty-state"><span>⌕</span><h3>No demo cars match</h3><p>Try a different search or location.</p><button className="secondary-button" onClick={() => { setQuery(''); setCity('All locations') }}>Clear filters</button></div>}
            </div>
            <div className="bottom-note"><span>✳</span><div><strong>Designed around trust, not just listings.</strong><p>TrustCar is an open-source prototype exploring clearer estimates, traceable booking states, and fair handover records.</p></div><button onClick={() => setActiveTab('Trust centre')}>See trust features →</button></div>
          </section>
        )}

        {activeTab === 'My bookings' && (
          <section className="page inner-page">
            <div className="eyebrow muted">YOUR ACTIVITY</div><h1 className="page-title">My bookings</h1><p className="page-subtitle">Track demo requests and see what happens next. Nothing here reserves a real car.</p>
            <div className="summary-strip"><div><span>Total requests</span><strong>{bookings.length}</strong></div><div><span>Awaiting response</span><strong>{bookings.filter(b => b.status === 'Requested').length}</strong></div><div><span>Cancelled</span><strong>{bookings.filter(b => b.status === 'Cancelled').length}</strong></div></div>
            {bookings.length === 0 ? <div className="empty-panel"><div className="empty-illustration">▤</div><h3>Your journey starts here</h3><p>When you request a demo booking, it will appear here with its status and cost estimate.</p><button className="primary-button" onClick={() => setActiveTab('Explore')}>Explore cars →</button></div> : <div className="booking-list">{bookings.map(b => <article className="booking-card" key={b.id}><img src={b.car.image} alt="" /><div className="booking-main"><div className="booking-heading"><h3>{b.car.name}</h3><span className={'status status-' + b.status.toLowerCase()}>{b.status}</span></div><p>{b.car.city} · {b.start} to {b.end} · {b.days} day(s)</p><div className="booking-meta"><span>Request ID <strong>{b.id}</strong></span><span>Created {b.createdAt}</span></div><details className="timeline"><summary>View booking timeline</summary><ol><li className="complete"><strong>Request created</strong><span>Your demo request has been recorded in this browser.</span></li><li className={b.status === 'Approved' ? 'complete' : ''}><strong>Owner response</strong><span>{b.status === 'Approved' ? 'Demo owner approved this request.' : b.status === 'Cancelled' ? 'This request was cancelled in the demo.' : 'Waiting for a demo owner response.'}</span></li><li><strong>Pickup handover</strong><span>Not available in this demo until a request is approved.</span></li></ol></details></div><div className="booking-total"><span>Estimate</span><strong>{money(b.car.price * b.days + 199 * b.days)}</strong><small>+ {money(b.car.deposit)} simulated deposit</small>{b.status === 'Requested' && <button className="text-button danger" onClick={() => cancelBooking(b.id)}>Cancel request</button>}</div></article>)}</div>}
            <div className="disclaimer-box"><span>ⓘ</span><p><strong>Prototype notice:</strong> booking status is stored in your browser only. There is no owner account or live availability system yet.</p></div>
          </section>
        )}

        {activeTab === 'Trust centre' && (
          <section className="page inner-page">
            <div className="eyebrow muted">BUILT FOR ACCOUNTABILITY</div><h1 className="page-title">The Trust Centre</h1><p className="page-subtitle">Small records can prevent big misunderstandings. Try the demo tools below.</p>
            <div className="trust-feature-grid">
              <article className="trust-feature"><div className="feature-icon green">₹</div><span className="feature-kicker">01 / COST CLARITY</span><h3>Know the numbers</h3><p>Each listing shows a sample daily rate, service fee and simulated deposit separately.</p><button onClick={() => setActiveTab('Explore')}>Compare estimates ↗</button></article>
              <article className="trust-feature"><div className="feature-icon yellow">✓</div><span className="feature-kicker">02 / HANDOVER RECORD</span><h3>Check before you drive</h3><p>Tick off important pickup checks. The checklist stays in this browser for your demo session.</p><div className="checklist">{['Photos of existing scratches','Fuel level recorded','Odometer recorded','Lights and tyres checked','Return time confirmed'].map((item, i) => <label key={item}><input type="checkbox" checked={!!checklist[item]} onChange={e => setChecklist({ ...checklist, [item]: e.target.checked })} /><span>{item}</span></label>)}</div><div className="check-progress">{Object.values(checklist).filter(Boolean).length} of 5 checks completed</div></article>
              <article className="trust-feature"><div className="feature-icon blue">◷</div><span className="feature-kicker">03 / DEPOSIT VISIBILITY</span><h3>Track the deposit status</h3><p>Understand the proposed status journey before any money is involved.</p><div className="deposit-steps"><span className="step-active"><i>1</i><b>Not paid</b></span><span><i>2</i><b>Held</b></span><span><i>3</i><b>Returned</b></span></div><div className="simulated-label">Simulation only · no payment connected</div></article>
              <article className="trust-feature support-feature"><div className="feature-icon purple">✳</div><span className="feature-kicker">04 / SUPPORT TRAIL</span><h3>Make an issue traceable</h3><p>Create a local demo ticket and see its reference ID. No message is sent to a company.</p><form onSubmit={submitTicket} className="ticket-form"><label>Issue category<select value={ticketTopic} onChange={e => setTicketTopic(e.target.value)}><option>Booking or cancellation</option><option>Unexpected charge</option><option>Deposit or refund</option><option>Vehicle condition dispute</option><option>Other</option></select></label><label>What happened?<textarea value={ticketMessage} onChange={e => setTicketMessage(e.target.value)} placeholder="Describe the issue in a few sentences..." rows={3} required /></label><button className="primary-button" type="submit">Create demo ticket →</button></form>{tickets.length > 0 && <div className="ticket-list"><strong>Recent demo tickets</strong>{tickets.map(t => <div className="ticket-row" key={t.id}><span><b>{t.id}</b><small>{t.topic}</small></span><span className="status status-requested">{t.status}</span></div>)}</div>}</article>
            </div>
            <div className="disclaimer-box"><span>ⓘ</span><p>Trust tools are concepts under evaluation. This prototype does not verify owners, process deposits, provide legal advice, or guarantee rental safety.</p></div>
          </section>
        )}

        <footer className="footer"><span>© 2026 TrustCar India · Open-source concept</span><div><a href="https://github.com/Parth-dev026/TrustCar-India" target="_blank" rel="noreferrer">GitHub repository ↗</a><span>Demo data only</span></div></footer>
      </main>

      {selectedCar && (
        <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedCar(null) }}>
          <section className="car-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedCar(null)} aria-label="Close">×</button>
            <img className="modal-image" src={selectedCar.image} alt={selectedCar.name} />
            <div className="modal-content"><div className="eyebrow muted">DEMO LISTING · {selectedCar.city.toUpperCase()}</div><h2 id="modal-title">{selectedCar.name}</h2><p className="modal-sub">{selectedCar.type} · {selectedCar.seats} seats · {selectedCar.transmission} · {selectedCar.fuel}</p>
              <div className="modal-estimate"><div><span>Estimated daily rate</span><strong>{money(selectedCar.price)}</strong></div><div><span>Service fee / day</span><strong>{money(199)}</strong></div><div><span>Simulated refundable deposit</span><strong>{money(selectedCar.deposit)}</strong></div></div>
              <p className="form-note">Choose dates to preview a demo booking request. Dates do not check live availability.</p>
              <div className="date-fields"><label>Pickup date<input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min={new Date().toISOString().slice(0, 10)} /></label><label>Return date<input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || new Date().toISOString().slice(0, 10)} /></label></div>
              {startDate && endDate && new Date(endDate) >= new Date(startDate) && <div className="total-estimate"><span>Estimated total (before other costs)</span><strong>{money((selectedCar.price + 199) * (Math.max(1, Math.round((new Date(endDate + 'T00:00:00').getTime() - new Date(startDate + 'T00:00:00').getTime()) / 86400000) + 1))}</strong></div>}
              <button className="primary-button full-button" onClick={() => requestBooking(selectedCar)}>Request demo booking <span>→</span></button>
              <p className="modal-disclaimer">No payment, real reservation or owner notification will occur.</p>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App