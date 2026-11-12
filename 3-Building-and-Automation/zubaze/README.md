# Zubaze

**Developer:** Styner Stiner (StynerDev) · https://www.styner.dev/
**Live:** https://zubaze.com

I built Zubaze to manage the websites I build for clients and community members at Canticle Farm. Each client gets a private dashboard where they can see their site, its updates and their project details, and I manage every client from one developer dashboard.

## What it does
- **Developer dashboard:** add clients, attach their projects and websites, and manage everything in one place
- **Client dashboards:** a private, shareable page for each client showing their sites with live thumbnails
- **Payments and invoices:** payment settings for the developer, payment links and invoices for clients
- **Ratings:** clients can rate delivered work
- **Permanent deletion:** removing a client removes their data everywhere, with optimistic UI updates

## Web2 + Web3: how it fits together
Zubaze is a hybrid app. The parts people touch are classic Web2, and the data lives on Web3.

**Web3: Internet Computer (ICP)**
- A Motoko canister, `zubaz_storage` (`src/backend/main.mo`), is the database: users, clients, projects, documents, invoices, tasks, timeline updates and ratings
- On-chain asset storage for uploaded files such as site thumbnails
- The canister tracks its own cycles balance (ICP's compute fuel) so it can be topped up before it runs low

**Web2**
- React + TypeScript + Vite frontend with Tailwind CSS, hosted on Vercel
- Auth0 for sign-in
- A Node.js API (`server/`) on Railway that verifies each Auth0 token, then reads and writes the canister on the user's behalf
- Redis for sessions

**Flow:** browser → Auth0 sign-in → Node API checks the token → API calls the ICP canister → data comes back to the dashboard.

## Testing
Cypress end-to-end tests in `cypress/` cover client creation, client deletion and API response format.

## Run locally
```
yarn install
cp .env.example .env   # add your own keys
yarn dev
```

This folder is a copy for showing my work. Secrets, build output and licensed icon assets are left out.

Copyright (c) 2025-2026 Styner Stiner. All rights reserved.
