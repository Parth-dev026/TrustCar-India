# TrustCar-India

**An open-source exploration of a more transparent, trustworthy self-drive car rental experience in India.**

TrustCar-India is an early-stage project exploring how a peer-to-peer self-drive rental platform could make bookings, pricing, vehicle handovers, deposits, and complaints easier to understand and track.

> **Status: Planning / documentation MVP.** This repository currently describes the problem and proposed MVP. A functioning application has not been implemented yet.

## Problem to explore

People renting a self-drive vehicle may worry about unclear final charges, booking changes, deposit/refund status, vehicle-condition disagreements, and slow complaint resolution. Vehicle owners may also need clearer booking requests, handover records, and a structured way to resolve disputes.

These are research hypotheses, not claims that every provider has these problems. We need to validate them with user research and reliable sources before treating them as proven.

## Proposed MVP

- Demo renter, vehicle owner, and administrator roles
- Vehicle listings and basic search/filtering
- Booking requests and owner approval
- Itemised estimated pricing and clear terms shown before confirmation
- Pickup and return checklists with condition notes
- Simulated deposit and refund status tracking (no real money)
- Complaint tickets with status, evidence checklist, and escalation history
- Tests for pricing calculations and booking state transitions

## Principles

1. **Transparency:** show fees and conditions before confirmation.
2. **Traceability:** record booking, handover, complaint, and status changes.
3. **Fairness:** design for both renters and vehicle owners.
4. **Privacy by default:** use fictional demo data; do not collect real identity documents in the prototype.
5. **Legal caution:** rental eligibility and permit requirements must be checked with qualified local advice before any real-world launch.

## Planned technology

The initial web-app direction is React + TypeScript, with a backend API, relational database, and automated tests. The exact stack will be confirmed before implementation.

## Repository guide

- docs/PROBLEM_STATEMENT.md — problem and assumptions
- docs/REQUIREMENTS.md — MVP requirements and acceptance criteria
- docs/MVP_PLAN.md — implementation phases
- docs/USER_FLOWS.md — renter, owner, and admin journeys
- docs/TECHNICAL_DESIGN.md — proposed architecture
- docs/LEGAL_AND_SAFETY.md — legal, privacy, and safety boundaries
- research/COMPETITOR_AND_PAIN_POINT_RESEARCH.md — research plan and validation notes
- ROADMAP.md — project milestones
- CONTRIBUTING.md — how to contribute
- SECURITY.md — how to report security concerns

## Getting started

This is currently a documentation-first repository. There is no app to run yet. Follow the roadmap for the planned implementation.

## Important disclaimer

TrustCar-India is an educational prototype and is not a rental service, legal advice, or a guarantee of compliance with Indian transport laws. Do not use it to arrange real rentals or payments. Any commercial model must be reviewed against applicable central and state rules, permit requirements, insurance conditions, and platform obligations.

## Contributing

Ideas, documentation improvements, research with credible sources, accessible UX suggestions, and code contributions are welcome. See CONTRIBUTING.md.

## License

This project is intended to use the MIT License. See LICENSE.
