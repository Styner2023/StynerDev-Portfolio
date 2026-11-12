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

## Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Auth:** Auth0
- **Backend:** Node.js API (`server/`), Redis sessions, deployed on Railway
- **Storage:** an Internet Computer (DFINITY) canister written in Motoko for client and project data, plus blob storage for thumbnails
- **Testing:** Cypress end-to-end tests (`cypress/`)
- **Hosting:** Vercel (frontend)

## Run locally
```
yarn install
cp .env.example .env   # add your own keys
yarn dev
```

This folder is a copy for showing my work. Secrets, build output and licensed icon assets are left out.

Copyright (c) 2025-2026 Styner Stiner. All rights reserved.
