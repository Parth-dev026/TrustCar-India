# Proposed technical design

## Initial direction
- Frontend: React + TypeScript.
- UI: accessible component system with responsive layouts.
- Backend: typed API with server-side authorization.
- Database: relational database for bookings and audit history.
- Testing: unit tests for business rules plus integration tests for role permissions and booking conflicts.

This is a proposal, not a final stack commitment. Keep implementation simple enough for a student MVP.

## Main domain entities
- User: id, demo role, display name.
- Vehicle: id, owner id, attributes, location area, daily rate, availability, demo flag.
- Booking: id, renter id, vehicle id, time range, status, terms version, estimate total.
- PriceLineItem: booking id, label, amount, explanation.
- HandoverRecord: booking id, stage (pickup/return), timestamp, checklist, notes.
- DepositSimulation: booking id, simulated status, explanatory notice.
- ComplaintTicket: booking id, reporter id, category, summary, status, created timestamp.
- TicketEvent: ticket id, actor role, action, timestamp, reason.

## Important invariants
- A vehicle cannot have overlapping accepted/in-progress bookings.
- All money-like values use integer minor units or a fixed decimal type; avoid floating-point arithmetic.
- Price estimate lines must sum to the displayed estimate.
- State changes must be validated server-side.
- Ticket history should be append-oriented; avoid silently overwriting important events.
- The prototype must not process real payments or store identity documents.

## Security and privacy
- Enforce authorization on every protected API route.
- Validate and normalize all inputs.
- Use environment variables for secrets; commit only an example file.
- Apply safe logging and never log secrets or sensitive user data.
- Use fictional seed data for public demos.
- Add dependency and secret scanning before a public production deployment.

## Possible API surface
- GET /vehicles
- GET /vehicles/:id
- POST /bookings
- GET /bookings/:id
- POST /bookings/:id/decision
- POST /bookings/:id/handover
- POST /bookings/:id/complaints
- GET /complaints/:id
- POST /complaints/:id/events

Routes are illustrative; define the actual API when implementation begins.
