# TrustCar-India 🚗

**Exploring a more transparent and accountable self-drive car rental experience in India.**

TrustCar-India is an open-source, student-led project idea for a web platform that aims to make the self-drive rental journey easier to understand for both renters and vehicle owners. The initial focus is not just finding a car; it is making the steps around a booking—price clarity, handover records, deposit status, and complaint progress—more visible and traceable.

> [!IMPORTANT]
> **Project status: Early planning / documentation stage.** The repository currently contains the project plan and requirements. The working web application has **not** been built yet. Features below describe the proposed MVP, not features that are already available.

## Contents

- [The problem](#the-problem)
- [Our proposed approach](#our-proposed-approach)
- [How TrustCar-India aims to be different](#how-trustcar-india-aims-to-be-different)
- [Planned MVP features](#planned-mvp-features)
- [Who it is for](#who-it-is-for)
- [Project status](#project-status)
- [Technology direction](#technology-direction)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
- [Safety, privacy, and legal boundaries](#safety-privacy-and-legal-boundaries)
- [Contributing](#contributing)
- [License](#license)

## The problem

A self-drive rental journey involves more than choosing a vehicle. Renters and owners may have questions such as:

- What is included in the quoted price, and what other charges may apply?
- Is a booking requested, accepted, cancelled, or still awaiting a decision?
- What was the vehicle's condition at pickup, and how does it compare with its condition at return?
- What is the status of a deposit or refund?
- If something goes wrong, where can a person see the complaint status and next steps?

These are **problem hypotheses to validate**, not verified claims about any particular company or all rental services. The project will use credible public sources and user research to determine which problems are frequent and important.

## Our proposed approach

TrustCar-India proposes a single, traceable workflow for the parts of the rental journey that can otherwise be confusing:

1. Review a vehicle listing and its availability.
2. See an itemised estimated price and key terms before requesting a booking.
3. Follow clear booking states and the terms attached to the request.
4. Record pickup and return condition using separate checklists.
5. View an explicitly simulated deposit/refund status in the prototype.
6. Create a support ticket and follow its status history.

The first version is a **demonstration web application using fictional data**, not a service for arranging real rentals.

## How TrustCar-India aims to be different

The base idea of listing vehicles and allowing self-drive bookings already exists in the market. TrustCar-India is therefore **not claiming to invent peer-to-peer car rental**. Its proposed differentiation is to focus the prototype on the trust and transparency workflow around a booking.

| Area | Typical question a user may have | TrustCar-India's proposed focus |
|---|---|---|
| Price clarity | “What exactly am I paying for?” | Itemised estimate, clear fee explanations, and terms shown before a booking request |
| Booking reliability | “Has the owner accepted, and what happens next?” | Explicit booking states and visible status history |
| Vehicle condition | “How can both sides refer to the same handover record?” | Separate pickup and return checklists with timestamps and notes |
| Deposit visibility | “What is the current deposit/refund status?” | A clear status timeline in the prototype; no real money movement |
| Complaint handling | “Was my issue received, and what is its status?” | Ticket number, status updates, and a traceable history |
| Fairness to both sides | “Can the owner and renter both explain what happened?” | Records designed to document both parties' observations rather than automatically blaming either side |

**Important:** these are intended design priorities, not proven advantages over existing services. We will validate them through research and usability testing before making stronger comparisons.

## Planned MVP features

- **Demo roles:** renter, vehicle owner, and administrator.
- **Vehicle listings:** fictional listings with basic search and filters.
- **Booking requests:** owner approval or decline, clear states, and prevention of overlapping accepted bookings.
- **Price breakdown:** estimated line items and visible terms before confirmation.
- **Pickup/return records:** separate checklists, timestamps, and notes.
- **Deposit/refund simulation:** status tracking only; no actual payment or refund.
- **Support tickets:** category, summary, status, and event history.
- **Automated tests:** pricing calculations, booking conflicts, state transitions, and role permissions.

### Out of scope for the first MVP

- Real-world vehicle listings or rental fulfilment
- Real payments, deposits, or refunds
- Collection of driving licences, Aadhaar, or other identity documents
- Automated fraud accusations or automated decisions about liability
- Claims of legal approval or production readiness

## Who it is for

- **Renters** who want clearer pricing, booking status, and support visibility.
- **Vehicle owners** who want structured booking requests and handover records.
- **Student developers and open-source contributors** who want to learn by improving a real-world workflow through documented, testable increments.

## Project status

| Workstream | Status |
|---|---|
| Problem hypothesis and project scope | Drafted; needs validation |
| Requirements and user journeys | Initial documentation available |
| Legal and safety research | Checklist started; qualified review needed before any real service |
| Web application | Not implemented yet |
| Automated tests | Not implemented yet |
| Deployment/demo | Not available yet |

See [ROADMAP.md](ROADMAP.md) for the planned milestones and [docs/MVP_PLAN.md](docs/MVP_PLAN.md) for the implementation sequence.

## Technology direction

The current proposal is a responsive web application using **React + TypeScript**, a backend API, a relational database, and automated tests. The final stack will be chosen before implementation; no framework or service should be considered integrated yet.

## Repository structure

```text
TrustCar-India/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── ROADMAP.md
├── .gitignore
├── .env.example
├── docs/
│   ├── PROBLEM_STATEMENT.md
│   ├── REQUIREMENTS.md
│   ├── MVP_PLAN.md
│   ├── USER_FLOWS.md
│   ├── TECHNICAL_DESIGN.md
│   └── LEGAL_AND_SAFETY.md
└── research/
    └── COMPETITOR_AND_PAIN_POINT_RESEARCH.md
```

### Key documents

- [Problem statement](docs/PROBLEM_STATEMENT.md) — intended users, assumptions, and scope.
- [Requirements](docs/REQUIREMENTS.md) — planned behaviour and acceptance criteria.
- [MVP plan](docs/MVP_PLAN.md) — proposed build phases.
- [User flows](docs/USER_FLOWS.md) — renter, owner, and administrator journeys.
- [Technical design](docs/TECHNICAL_DESIGN.md) — proposed data model and architecture.
- [Legal and safety checklist](docs/LEGAL_AND_SAFETY.md) — boundaries for a safe educational prototype.
- [Research framework](research/COMPETITOR_AND_PAIN_POINT_RESEARCH.md) — how pain points and alternatives will be investigated.
- [Roadmap](ROADMAP.md) — progress and next steps.
- [Contribution guide](CONTRIBUTING.md) — how to suggest and contribute changes.
- [Security policy](SECURITY.md) — how to report security concerns.

## Getting started

**At present, there is no runnable application.** This repository is documentation-first, so there are no installation or run commands yet. Once the app exists, this section will include tested setup instructions, demo-account details, environment configuration, and test commands.

For now, start with the [problem statement](docs/PROBLEM_STATEMENT.md) and [MVP plan](docs/MVP_PLAN.md).

## Safety, privacy, and legal boundaries

TrustCar-India is an educational prototype, not a rental service, legal advice, or a guarantee of compliance with Indian transport laws. Do not use it to arrange real rentals or payments.

Before any real-world launch, the proposed business and vehicle model would need qualified review of applicable central and state transport rules, permits, insurance, contracts, consumer obligations, privacy, security, and operational support. The prototype should use fictional data and must not collect real identity documents or process money.

More detail: [docs/LEGAL_AND_SAFETY.md](docs/LEGAL_AND_SAFETY.md).

## Contributing

Contributions are welcome in the form of clear documentation, credible research sources, accessible UX suggestions, tests, and later, code. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) before participating. If you report a bug, include reproducible steps and never share secrets or personal data.

## License

The project is licensed under the [MIT License](LICENSE). See the license file for the terms.

---

**Built in public as a learning project.** The aim is to validate the problem carefully, make the scope explicit, and implement and test the smallest useful workflow before expanding it.
