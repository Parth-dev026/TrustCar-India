# MVP requirements

## Roles

- Renter: browses demo listings, requests a booking, views terms and status, records handover observations, and raises a ticket.
- Owner: manages demo listings, reviews booking requests, and completes pickup/return checklists.
- Admin: reviews tickets and updates their status with a short reason.

Authentication may initially use seeded demo accounts only. Do not store real credentials or identity documents in a prototype.

## Functional requirements

### Listings
- Show vehicle type, seating capacity, transmission, fuel type, location area, daily rate, and availability.
- Clearly label all seeded listings as fictional demo data.
- Filter by dates, price range, and vehicle attributes.

### Pricing and booking
- Calculate a clearly itemised estimate before a request is submitted.
- Show taxes, fees, deposit assumptions, cancellation conditions, and exclusions separately; never silently add charges.
- Store the terms/version shown to the user when they request a booking.
- Use explicit states: requested, accepted, declined, cancelled, in-progress, completed.
- Prevent conflicting bookings for the same demo vehicle and time range.

### Handover
- Capture timestamp, checklist answers, notes, and optional demo image placeholders.
- Record pickup and return separately so the two records can be compared.
- Do not upload real documents or private images in the first prototype.

### Deposit simulation
- Display simulated states such as not applicable, pending, held (simulated), refund pending (simulated), and closed.
- Make it unmistakable that no real money is moved.

### Complaints
- Let users create a ticket linked to a demo booking.
- Require category, summary, and desired resolution.
- Track status, timestamps, and admin notes.
- Avoid public accusations or automated judgments; show neutral status language.

## Non-functional requirements

- Responsive and keyboard-accessible UI.
- Validate user input on both client and server.
- Enforce role permissions on the server, not only by hiding UI controls.
- Avoid secrets in source control and logs.
- Include tests for pricing, date overlap, state transitions, and permissions.
- Provide clear demo-data and legal disclaimers.

## MVP acceptance criteria

- A user can complete a demo booking request end-to-end.
- A conflicting booking is rejected.
- The pricing breakdown is visible before confirmation.
- Pickup and return checklist entries can be reviewed together.
- A complaint ticket can be created and tracked through status changes.
- No live payment, deposit, or identity-document collection exists.
