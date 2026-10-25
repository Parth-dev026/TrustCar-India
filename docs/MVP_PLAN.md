# MVP implementation plan

## Phase 0 — Validate the problem
- Interview a small, varied group of renters and vehicle owners.
- Review public complaints as anecdotes, not proof; record source, date, and recurring theme.
- Identify legal and insurance questions that require qualified advice.
- Refine the problem statement before building more than a demo.

## Phase 1 — UX and data model
- Create renter, owner, and admin journeys.
- Define listing, booking, pricing-line-item, handover, deposit-simulation, and complaint entities.
- Design empty, loading, error, and permission-denied states.
- Use fictional seed data.

## Phase 2 — Core web app
- Build responsive listing/search pages.
- Implement booking request and owner decision states.
- Add itemised estimate and saved terms version.
- Add tests for date conflicts and booking transitions.

## Phase 3 — Trust and support workflows
- Add pickup and return checklists.
- Add simulated deposit/refund status.
- Add complaint ticket timeline and admin triage.
- Ensure users can export or review their own demo booking history.

## Phase 4 — Quality and demo
- Add accessibility and responsive checks.
- Add unit and integration tests.
- Document setup, demo accounts, limitations, and architecture.
- Record a short demo using only fictional data.

## Suggested demo scenario

A renter filters fictional cars, opens a listing, reviews an itemised estimate and terms, sends a booking request, and sees the owner accept it. The renter and owner complete pickup/return checklists. The renter opens a complaint ticket and can follow its status. A visible notice explains that deposits and refunds are simulated.

## Release gate

Do not connect real payments, identity verification, or real rentals until the legal model, insurance, privacy, security, and operational processes have been reviewed by qualified professionals.
