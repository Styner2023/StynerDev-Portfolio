# CLAUDE.md — Benefits-Safe Grant Disbursement Platform
# =====================================================
# THIS FILE IS THE BRAIN OF THE PROJECT.
# Claude AI in VS Code MUST read this file before writing ANY code.
# If you are Claude, read this ENTIRE file before responding to any request.
# Do NOT skip sections. Do NOT guess. Follow these instructions exactly.

## PROJECT IDENTITY

- **Product Name**: Benefits-Safe Grant Disbursement Platform
- **What It Does**: Helps nonprofits disburse restricted grant funds to vendors on behalf of beneficiaries who receive SSI, SSDI, Medicaid, and Medi-Cal — without those beneficiaries losing their government benefits.
- **Core Value Proposition**: "Help nonprofits disburse restricted funds without turning them into benefits problems."
- **This is a FINTECH COMPLIANCE product.** Every line of code matters. Errors can cause real people to lose real government benefits. Code carefully.

---

## THE THREE PARTIES IN EVERY GRANT

Every grant in this system involves three distinct parties. NEVER confuse them:

1. **Grant Issuer** — The foundation or funder who awarded the money.
2. **Grant Receiver** — The nonprofit or fiscal sponsor holding the money (e.g., Canticle Farm).
3. **Intended Beneficiary** — The person the grant is for (e.g., a writer on SSI/Medi-Cal who cannot receive cash directly).

These are THREE SEPARATE database entities. Do NOT merge "receiver" and "beneficiary."

---

## TECH STACK — ABSOLUTE REQUIREMENTS

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16+ | App Router ONLY. No Pages Router. |
| UI Library | React | 19+ | Server Components where appropriate |
| Language | TypeScript | 5.8+ | STRICT mode. No `any` types in production code. |
| CSS | Tailwind CSS | v4+ | Utility-first. NO BOOTSTRAP. EVER. |
| Components | shadcn/ui | Latest | Radix primitives. "new-york" style. |
| Auth | NextAuth v5 → Clerk (production) | Latest | OAuth (Google, Apple), MFA, role-based access |
| Database | PostgreSQL | 15+ | Via Supabase or AWS RDS |
| ORM | Prisma | Latest | Type-safe queries, migrations |
| Cards | Stripe Issuing + Stripe Connect | Latest | Virtual cards, merchant locks, spending caps |
| Banking | Plaid | Latest | Bank account linking and verification |
| Validation | Zod | Latest | Schema validation for all forms and API inputs |
| Forms | React Hook Form | Latest | With @hookform/resolvers for Zod |
| Charts | ApexCharts (react-apexcharts) | Latest | Dashboard visualizations |
| Icons | Lucide React | Latest | Consistent icon set |
| Hosting | Vercel (frontend) + AWS (backend/DB) | - | Multi-AZ, encrypted |
| Email | Postmark (transactional) | - | Approval notifications, summaries |
| Monitoring | Sentry | Latest | Error tracking |
| Analytics | PostHog | Latest | Feature adoption, user flows |

### BANNED TECHNOLOGIES — NEVER USE THESE:
- ❌ Bootstrap (any version)
- ❌ jQuery
- ❌ Firebase (for auth or database — template may have it, REMOVE IT)
- ❌ MongoDB (use PostgreSQL only)
- ❌ Mongoose
- ❌ Express.js (use Next.js API routes instead)
- ❌ Pages Router (use App Router only)
- ❌ `any` type in TypeScript (except in explicit escape hatches with comments)
- ❌ localStorage/sessionStorage for sensitive data
- ❌ Storing card numbers, CVVs, or bank credentials (Stripe/Plaid handle this)
- ❌ Blockchain anything

---

## APPLICATION ARCHITECTURE

### Pattern: Modular Monolith
One Next.js codebase. Cleanly separated into modules by domain. Deployed as one application. Do NOT use microservices.

### Module Structure
```
app/
├── (auth)/                    # Authentication pages (public)
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── layout.tsx
├── (dashboard)/               # All authenticated pages
│   ├── layout.tsx             # Shared dashboard layout with sidebar
│   ├── (nonprofit-admin)/     # Nonprofit admin pages
│   │   ├── grants/
│   │   ├── expenses/
│   │   ├── vendors/
│   │   ├── cards/
│   │   ├── subscriptions/
│   │   ├── reports/
│   │   ├── users/
│   │   ├── policies/
│   │   └── settings/
│   ├── (beneficiary)/         # Beneficiary portal pages
│   │   ├── my-dashboard/
│   │   ├── my-expenses/
│   │   ├── my-subscriptions/
│   │   └── documents/
│   ├── (cpa)/                 # CPA/Auditor portal pages
│   │   ├── reports/
│   │   ├── audit-trail/
│   │   ├── compliance/
│   │   └── export/
│   ├── (vendor)/              # Vendor onboarding portal
│   │   ├── onboarding/
│   │   ├── invoices/
│   │   └── payment-status/
│   └── (platform-admin)/     # YOUR internal admin
│       ├── customers/
│       ├── metrics/
│       ├── billing/
│       ├── compliance-rules/
│       └── support/
├── api/                       # API routes
│   ├── auth/
│   ├── grants/
│   ├── expenses/
│   ├── vendors/
│   ├── cards/
│   ├── reports/
│   ├── webhooks/
│   │   ├── stripe/
│   │   └── plaid/
│   └── compliance/
├── globals.css
├── layout.tsx                 # Root layout
└── page.tsx                   # Landing redirect
```

### Component Structure
```
components/
├── ui/                        # shadcn/ui components (DO NOT MODIFY these directly)
│   ├── button.tsx
│   ├── card.tsx
│   ├── table.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── badge.tsx
│   ├── tabs.tsx
│   ├── sidebar.tsx
│   └── ... (all shadcn components)
├── layout/                    # Layout components
│   ├── app-sidebar.tsx        # Main sidebar navigation (role-aware)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── breadcrumb.tsx
│   └── dashboard-shell.tsx
├── grants/                    # Grant-specific components
│   ├── grant-form.tsx
│   ├── grant-card.tsx
│   ├── grant-list.tsx
│   ├── budget-category-form.tsx
│   └── budget-tracker.tsx
├── expenses/                  # Expense-specific components
│   ├── expense-request-form.tsx
│   ├── expense-list.tsx
│   ├── expense-approval-card.tsx
│   └── risk-badge.tsx
├── vendors/                   # Vendor-specific components
│   ├── vendor-form.tsx
│   ├── vendor-list.tsx
│   ├── vendor-approval-card.tsx
│   └── vendor-onboarding-wizard.tsx
├── cards/                     # Virtual card components
│   ├── card-display.tsx
│   ├── card-list.tsx
│   └── card-controls.tsx
├── compliance/                # Compliance engine components
│   ├── risk-classification.tsx
│   ├── policy-configurator.tsx
│   └── compliance-summary.tsx
├── reports/                   # Reporting components
│   ├── grant-report.tsx
│   ├── spending-chart.tsx
│   ├── audit-trail-table.tsx
│   └── export-button.tsx
└── shared/                    # Shared across all modules
    ├── data-table.tsx
    ├── status-badge.tsx
    ├── loading-skeleton.tsx
    ├── error-boundary.tsx
    ├── confirm-dialog.tsx
    └── file-upload.tsx
```

### Other Directories
```
lib/
├── db.ts                      # Database connection (Prisma client)
├── auth.ts                    # Auth configuration
├── stripe.ts                  # Stripe client setup
├── plaid.ts                   # Plaid client setup
├── utils.ts                   # General utilities (cn, formatCurrency, etc.)
└── zod.ts                     # Shared Zod schemas

hooks/
├── use-grants.ts
├── use-expenses.ts
├── use-vendors.ts
├── use-cards.ts
├── use-compliance.ts
├── use-user-role.ts
└── use-mobile.ts

types/
├── grant.ts
├── expense.ts
├── vendor.ts
├── card.ts
├── user.ts
├── compliance.ts
└── index.ts                   # Re-exports all types

prisma/
├── schema.prisma              # Database schema
├── migrations/
└── seed.ts                    # Seed data for development

utils/
├── compliance-rules/
│   ├── california.ts          # CA SSI/Medi-Cal rules
│   ├── federal-ssi.ts         # Federal SSI rules
│   └── index.ts               # Rule engine
├── currency.ts
├── date.ts
└── permissions.ts             # Role-based permission checks
```

---

## USER ROLES — THIS IS CRITICAL

There are exactly 5 user roles. The sidebar navigation, page access, and data visibility all depend on role.

### Role: `nonprofit_admin`
- **Who**: Staff at the nonprofit organization managing grants
- **Can see**: Everything for their organization — grants, expenses, vendors, cards, reports, users, policies, settings
- **Can do**: Create grants, approve expenses, approve vendors, issue cards, configure policies, invite users, generate reports
- **Cannot see**: Other organizations' data, platform-level metrics

### Role: `beneficiary`
- **Who**: The person the grant is for (e.g., a disabled writer)
- **Can see**: Only their own project — My Dashboard, My Expenses, My Subscriptions, Documents
- **Can do**: Submit expense requests, add subscription requests, upload receipts, see approved virtual card details for billing updates, mark billing as updated
- **Cannot see**: Nonprofit banking details, other beneficiaries' data, approval workflows, policy settings
- **Cannot do**: Approve anything, issue cards, modify policies, access financial admin

### Role: `cpa`
- **Who**: The nonprofit's accountant or auditor
- **Can see**: Reports, audit trails, compliance summaries, financial exports for assigned organization(s)
- **Can do**: Download reports, review audit trails, verify compliance, export data
- **Cannot do**: Modify any data, approve expenses, issue cards, change settings
- **READ-ONLY access everywhere**

### Role: `vendor`
- **Who**: A freelancer, editor, service provider who receives payments from the nonprofit
- **Can see**: Only their own vendor profile — Onboarding status, My Invoices, Payment Status
- **Can do**: Complete onboarding form, upload invoices, update payment details, update contact info
- **Cannot see**: Grant details, beneficiary info, nonprofit banking, other vendors

### Role: `platform_admin`
- **Who**: Your internal team (the company building this platform)
- **Can see**: Everything across ALL organizations — all customers, all grants, platform metrics, billing, compliance rules
- **Can do**: Manage compliance rule engine, update subscription billing, view support tickets, monitor platform health
- **This is a SUPER-ADMIN role. Not exposed to customers.**

### PERMISSION ENFORCEMENT RULES:
1. **Every API route** must check the user's role before returning data.
2. **Every page** must check the user's role before rendering.
3. **The sidebar** must only show menu items appropriate for the user's role.
4. **Data queries** must be scoped to the user's organization (except platform_admin).
5. **Never trust the client.** All permission checks happen server-side.

---

## DATABASE SCHEMA (PostgreSQL + Prisma)

### Core Models:

```prisma
model Organization {
  id            String   @id @default(cuid())
  name          String
  ein           String?  // Tax ID
  address       String?
  phone         String?
  website       String?
  stripeAccountId String? // Stripe Connect account
  plaidItemId   String?  // Plaid connection
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  users         User[]
  grants        Grant[]
  vendors       Vendor[]
  cards         VirtualCard[]
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  role          UserRole
  organizationId String
  organization  Organization @relation(fields: [organizationId], references: [id])
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  expenseRequests ExpenseRequest[]
  approvals       Approval[]
}

enum UserRole {
  nonprofit_admin
  beneficiary
  cpa
  vendor
  platform_admin
}

model Grant {
  id              String   @id @default(cuid())
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])

  // Three-party model
  grantIssuerName String
  grantIssuerContact String?
  beneficiaryId   String?
  beneficiary     User?    @relation("GrantBeneficiary", fields: [beneficiaryId], references: [id])

  name            String
  description     String?
  totalAmount     Decimal  @db.Decimal(12,2)
  spentAmount     Decimal  @default(0) @db.Decimal(12,2)
  remainingAmount Decimal  @db.Decimal(12,2)
  status          GrantStatus @default(ACTIVE)
  startDate       DateTime
  endDate         DateTime?
  restrictions    String?  // Grant restrictions text

  // Benefit flags for the beneficiary
  benefitFlags    Json?    // { ssi: true, ssdi: false, mediCal: true, medicaid: false, able: false }

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  categories      BudgetCategory[]
  expenses        ExpenseRequest[]
}

enum GrantStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

model BudgetCategory {
  id            String   @id @default(cuid())
  grantId       String
  grant         Grant    @relation(fields: [grantId], references: [id])
  name          String   // e.g., "Editing", "Subscriptions", "Travel"
  allocatedAmount Decimal @db.Decimal(12,2)
  spentAmount   Decimal  @default(0) @db.Decimal(12,2)
  cardMode      CardMode @default(SINGLE_CARD) // One card for category or per-vendor

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  expenses      ExpenseRequest[]
  cards         VirtualCard[]
}

enum CardMode {
  SINGLE_CARD
  PER_VENDOR
}

model ExpenseRequest {
  id            String   @id @default(cuid())
  grantId       String
  grant         Grant    @relation(fields: [grantId], references: [id])
  categoryId    String
  category      BudgetCategory @relation(fields: [categoryId], references: [id])
  requestedById String
  requestedBy   User     @relation(fields: [requestedById], references: [id])
  vendorId      String?
  vendor        Vendor?  @relation(fields: [vendorId], references: [id])

  description   String
  amount        Decimal  @db.Decimal(12,2)
  frequency     ExpenseFrequency @default(ONE_TIME)
  expenseType   String   // e.g., "subscription", "invoice", "equipment"

  // Compliance
  riskClassification RiskLevel @default(PENDING)
  riskNotes     String?
  policyViolations Json? // Array of policy violations if any

  // Status
  status        ExpenseStatus @default(PENDING)
  approvedById  String?
  approvedAt    DateTime?
  rejectedReason String?

  // Documents
  receiptUrl    String?
  invoiceUrl    String?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  approvals     Approval[]
  ledgerEntries LedgerEntry[]
}

enum ExpenseFrequency {
  ONE_TIME
  MONTHLY
  QUARTERLY
  ANNUAL
}

enum RiskLevel {
  PENDING
  LIKELY_SAFE      // Green
  NEEDS_REVIEW     // Yellow
  LIKELY_RISKY     // Orange
  BLOCKED          // Red
}

enum ExpenseStatus {
  PENDING
  APPROVED
  REJECTED
  PAID
  CANCELLED
}

model Vendor {
  id            String   @id @default(cuid())
  organizationId String
  organization  Organization @relation(fields: [organizationId], references: [id])
  userId        String?  // If vendor has a user account
  user          User?    @relation(fields: [userId], references: [id])

  name          String
  type          VendorType
  email         String?
  phone         String?
  website       String?
  address       String?

  // Payment info (stored securely, not raw bank details)
  paymentMethod String?  // "ach", "card", "check"
  stripePaymentMethodId String? // Stripe-managed payment method

  // Status
  status        VendorStatus @default(PENDING)
  approvedAt    DateTime?

  // Tax
  taxIdCollected Boolean @default(false)
  form1099Required Boolean @default(false)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  expenses      ExpenseRequest[]
  subscriptions Subscription[]
}

enum VendorType {
  SAAS_SUBSCRIPTION  // Adobe, ChatGPT, GitHub, etc.
  SERVICE_PROVIDER   // Editor, designer, coach, etc.
  ONE_TIME_VENDOR    // Conference, equipment seller, etc.
}

enum VendorStatus {
  DRAFT
  PENDING
  APPROVED
  AWAITING_PAYMENT_SETUP
  ACTIVE
  BLOCKED
  ARCHIVED
}

model Subscription {
  id            String   @id @default(cuid())
  vendorId      String
  vendor        Vendor   @relation(fields: [vendorId], references: [id])
  grantId       String
  categoryId    String

  serviceName   String   // e.g., "Adobe Creative Cloud"
  loginEmail    String   // Email used for the subscription account
  monthlyCost   Decimal  @db.Decimal(10,2)
  billingCycle  String   // "monthly", "annual"
  renewalDate   DateTime?

  // Card assignment
  cardId        String?
  card          VirtualCard? @relation(fields: [cardId], references: [id])

  // Billing update tracking
  billingUpdateStatus BillingUpdateStatus @default(PENDING)
  billingUpdatedAt    DateTime?

  status        SubscriptionStatus @default(ACTIVE)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum BillingUpdateStatus {
  PENDING          // Card not yet updated
  CARD_ISSUED      // Nonprofit issued the card
  CARD_SHARED      // Card details shown to beneficiary
  UPDATED          // Beneficiary confirmed billing updated
  VERIFIED         // Charge confirmed on the card
}

enum SubscriptionStatus {
  ACTIVE
  PAUSED
  CANCELLED
  EXPIRED
}

model VirtualCard {
  id              String   @id @default(cuid())
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])
  categoryId      String?
  category        BudgetCategory? @relation(fields: [categoryId], references: [id])

  stripeCardId    String   // Stripe Issuing card ID
  last4           String
  expirationMonth Int
  expirationYear  Int
  spendingCap     Decimal? @db.Decimal(10,2)
  merchantLock    String?  // Locked to specific merchant if applicable

  status          CardStatus @default(ACTIVE)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  subscriptions   Subscription[]
  transactions    Transaction[]
}

enum CardStatus {
  ACTIVE
  FROZEN
  CANCELLED
  EXPIRED
}

model Transaction {
  id            String   @id @default(cuid())
  cardId        String
  card          VirtualCard @relation(fields: [cardId], references: [id])
  stripeTransactionId String @unique

  amount        Decimal  @db.Decimal(10,2)
  merchantName  String
  merchantCategory String?
  status        String   // "pending", "completed", "declined"
  declinedReason String?

  createdAt     DateTime @default(now())
}

model LedgerEntry {
  id            String   @id @default(cuid())
  grantId       String
  categoryId    String?
  expenseId     String?
  expense       ExpenseRequest? @relation(fields: [expenseId], references: [id])

  type          LedgerType
  amount        Decimal  @db.Decimal(12,2)
  balanceAfter  Decimal  @db.Decimal(12,2)
  description   String
  reference     String?  // Transaction ID, invoice number, etc.

  createdAt     DateTime @default(now())

  // IMMUTABLE — no updatedAt. Ledger entries are NEVER modified.
}

enum LedgerType {
  CREDIT   // Money added to grant
  DEBIT    // Money spent from grant
}

model Approval {
  id            String   @id @default(cuid())
  expenseId     String
  expense       ExpenseRequest @relation(fields: [expenseId], references: [id])
  approverId    String
  approver      User     @relation(fields: [approverId], references: [id])
  action        ApprovalAction
  notes         String?
  createdAt     DateTime @default(now())
}

enum ApprovalAction {
  APPROVED
  REJECTED
  REQUESTED_INFO
}

model AuditLog {
  id            String   @id @default(cuid())
  userId        String
  organizationId String
  action        String   // "create", "update", "delete", "approve", "reject"
  entityType    String   // "grant", "expense", "vendor", "card", etc.
  entityId      String
  oldValue      Json?
  newValue      Json?
  ipAddress     String?
  createdAt     DateTime @default(now())

  // IMMUTABLE — no updatedAt. Audit logs are NEVER modified or deleted.
}

model Document {
  id            String   @id @default(cuid())
  organizationId String
  entityType    String   // "expense", "vendor", "grant"
  entityId      String
  fileName      String
  fileUrl       String   // S3 URL
  fileType      String   // "receipt", "invoice", "contract", "grant_letter"
  uploadedById  String
  createdAt     DateTime @default(now())
}

model DisbursementPolicy {
  id              String   @id @default(cuid())
  organizationId  String
  grantId         String?  // If null, applies to all grants for this org

  cashToRecipient       PolicySetting @default(DISALLOWED)
  reimbursementToRecipient PolicySetting @default(DISALLOWED)
  rentUtilityPayments   PolicySetting @default(REQUIRES_REVIEW)
  recurringSubscriptions PolicySetting @default(ALLOWED)
  maxSingleTransaction  Decimal? @db.Decimal(10,2)

  allowedCategories     Json?  // Array of allowed expense category names
  blockedCategories     Json?  // Array of blocked expense category names

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum PolicySetting {
  ALLOWED
  DISALLOWED
  REQUIRES_REVIEW
}
```

### DATABASE RULES — NEVER VIOLATE THESE:
1. **LedgerEntry and AuditLog are IMMUTABLE.** Never add updatedAt. Never update or delete rows. Append only.
2. **Soft deletes only.** Never hard-delete financial records. Add an `archivedAt` column instead.
3. **All money fields use Decimal(12,2) or Decimal(10,2).** NEVER use Float for money.
4. **Every write operation creates an AuditLog entry.** No exceptions.
5. **All queries must be scoped to organizationId** (except platform_admin role).
6. **Encrypt sensitive fields** (benefit flags, vendor payment references) at the application level.
7. **Timestamps in UTC.** Display in user's local timezone on the frontend.

---

## COMPLIANCE ENGINE — THE PRODUCT'S SOUL

The compliance engine classifies every expense request based on SSI/Medi-Cal rules. This is what makes this platform different from generic expense software.

### Risk Classification Logic:

```typescript
// utils/compliance-rules/federal-ssi.ts

export type RiskLevel = 'LIKELY_SAFE' | 'NEEDS_REVIEW' | 'LIKELY_RISKY' | 'BLOCKED';

export function classifyExpense(expense: {
  type: string;
  description: string;
  vendorType: string;
  amount: number;
  category: string;
}, policy: DisbursementPolicy): { level: RiskLevel; reason: string } {

  // BLOCKED: Cash or cash-equivalent to beneficiary
  if (isCashOrCashEquivalent(expense)) {
    return { level: 'BLOCKED', reason: 'Cash or cash-equivalent payments to beneficiary are not allowed. SSA treats these as income for SSI.' };
  }

  // BLOCKED: Generic prepaid card, Visa gift card
  if (isGenericPrepaidCard(expense)) {
    return { level: 'BLOCKED', reason: 'Generic prepaid cards are treated as cash equivalents by SSA.' };
  }

  // LIKELY_RISKY: Rent, mortgage, utilities
  if (isShelterExpense(expense)) {
    return { level: 'LIKELY_RISKY', reason: 'Shelter payments (rent, mortgage, utilities) can reduce SSI benefits. Requires attorney review.' };
  }

  // NEEDS_REVIEW: Reimbursement to beneficiary
  if (isReimbursementToRecipient(expense)) {
    return { level: 'NEEDS_REVIEW', reason: 'Reimbursements paid directly to the beneficiary are risky for SSI. Prefer direct vendor payment.' };
  }

  // LIKELY_SAFE: Direct vendor payment for non-shelter, non-food items
  if (isDirectVendorPayment(expense) && !isFoodExpense(expense) && !isShelterExpense(expense)) {
    return { level: 'LIKELY_SAFE', reason: 'Direct payment to vendor for project expenses (not food or shelter) is generally safe for SSI.' };
  }

  // NEEDS_REVIEW: Food-related expenses
  if (isFoodExpense(expense)) {
    return { level: 'NEEDS_REVIEW', reason: 'Food-related expenses may count as income for SSI. Review current SSA rules.' };
  }

  // Default: NEEDS_REVIEW
  return { level: 'NEEDS_REVIEW', reason: 'Expense does not match a known safe or risky pattern. Manual review recommended.' };
}
```

### COMPLIANCE DISCLAIMERS — REQUIRED ON EVERY SCREEN:
Every page that shows risk classifications MUST include this disclaimer:
> "This classification is guidance based on general SSI/Medi-Cal rules, not legal advice. Consult a benefits attorney or WIPA specialist for decisions affecting government benefits."

Put this in a shared component: `components/compliance/compliance-disclaimer.tsx`

---

## VIRTUAL CARD FLOW — HOW SUBSCRIPTIONS GET PAID

This is the core operational flow. Understand it completely.

1. Beneficiary logs in, goes to "My Subscriptions," clicks "Add Subscription"
2. Beneficiary enters: vendor name, login email for that service, monthly cost, billing cycle
3. Nonprofit admin sees the request in their approval queue
4. Compliance engine auto-classifies the expense (green/yellow/orange/red)
5. Nonprofit admin approves the subscription
6. System creates a virtual card via Stripe Issuing (merchant-locked, spending-capped)
7. Card details are displayed to the beneficiary in their portal
8. Beneficiary logs into their own subscription account (e.g., Adobe)
9. Beneficiary updates billing to the nonprofit's virtual card (one-time action)
10. Beneficiary clicks "Mark as Updated" in the platform
11. Subscription auto-charges the card every billing cycle going forward
12. All transactions are logged to the restricted fund ledger

### KEY RULE: The nonprofit NEVER needs the beneficiary's passwords.
The beneficiary controls their own subscription logins. The platform provides the payment card. The beneficiary swaps the billing method themselves.

---

## API DESIGN

All API routes follow REST conventions:

```
POST   /api/grants                    # Create grant
GET    /api/grants                    # List grants (scoped to org)
GET    /api/grants/[id]               # Get grant details
PATCH  /api/grants/[id]               # Update grant
DELETE /api/grants/[id]               # Soft-delete grant

POST   /api/expenses                  # Submit expense request
GET    /api/expenses                  # List expenses
PATCH  /api/expenses/[id]/approve     # Approve expense
PATCH  /api/expenses/[id]/reject      # Reject expense

POST   /api/vendors                   # Create vendor
GET    /api/vendors                   # List vendors
PATCH  /api/vendors/[id]/approve      # Approve vendor

POST   /api/cards                     # Issue virtual card
GET    /api/cards                     # List cards
PATCH  /api/cards/[id]/freeze         # Freeze card
PATCH  /api/cards/[id]/unfreeze       # Unfreeze card

POST   /api/subscriptions             # Add subscription
GET    /api/subscriptions             # List subscriptions
PATCH  /api/subscriptions/[id]/mark-updated  # Mark billing as updated

GET    /api/reports/grant-spending     # Grant spending report
GET    /api/reports/compliance-summary # Compliance summary
GET    /api/reports/audit-trail        # Audit trail

POST   /api/webhooks/stripe           # Stripe webhook handler
POST   /api/webhooks/plaid            # Plaid webhook handler
```

### API RULES:
1. Every route checks authentication (NextAuth session)
2. Every route checks role permissions
3. Every route validates input with Zod schemas
4. Every write operation creates an AuditLog entry
5. Every response uses consistent shape: `{ data, error, message }`
6. Rate limiting on all endpoints
7. Financial amounts always as strings (to avoid floating point issues) in JSON, converted to Decimal in DB

---

## SIDEBAR NAVIGATION BY ROLE

```typescript
// components/layout/sidebar-nav-items.ts

export function getNavItems(role: UserRole) {
  switch (role) {
    case 'nonprofit_admin':
      return [
        { title: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
        { title: 'Grants', icon: 'FileText', href: '/grants' },
        { title: 'Expenses', icon: 'Receipt', href: '/expenses' },
        { title: 'Vendors', icon: 'Users', href: '/vendors' },
        { title: 'Cards', icon: 'CreditCard', href: '/cards' },
        { title: 'Subscriptions', icon: 'RefreshCw', href: '/subscriptions' },
        { title: 'Reports', icon: 'BarChart3', href: '/reports' },
        { title: 'Team', icon: 'UserCog', href: '/users' },
        { title: 'Policies', icon: 'Shield', href: '/policies' },
        { title: 'Settings', icon: 'Settings', href: '/settings' },
      ];

    case 'beneficiary':
      return [
        { title: 'My Dashboard', icon: 'LayoutDashboard', href: '/my-dashboard' },
        { title: 'My Expenses', icon: 'Receipt', href: '/my-expenses' },
        { title: 'My Subscriptions', icon: 'RefreshCw', href: '/my-subscriptions' },
        { title: 'Documents', icon: 'FolderOpen', href: '/documents' },
      ];

    case 'cpa':
      return [
        { title: 'Reports', icon: 'BarChart3', href: '/reports' },
        { title: 'Audit Trail', icon: 'History', href: '/audit-trail' },
        { title: 'Compliance', icon: 'Shield', href: '/compliance' },
        { title: 'Export', icon: 'Download', href: '/export' },
      ];

    case 'vendor':
      return [
        { title: 'Onboarding', icon: 'ClipboardList', href: '/onboarding' },
        { title: 'My Invoices', icon: 'FileText', href: '/invoices' },
        { title: 'Payment Status', icon: 'DollarSign', href: '/payment-status' },
      ];

    case 'platform_admin':
      return [
        { title: 'All Customers', icon: 'Building2', href: '/customers' },
        { title: 'Platform Metrics', icon: 'BarChart3', href: '/metrics' },
        { title: 'Billing', icon: 'CreditCard', href: '/billing' },
        { title: 'Compliance Rules', icon: 'Shield', href: '/compliance-rules' },
        { title: 'Support', icon: 'HeadphonesIcon', href: '/support' },
      ];
  }
}
```

---

## COLOR PALETTE (Tailwind Config)

> **NOTE:** Marketing site uses the original Azzle template colors (black, white, coral/orange).
> App dashboard colors will be aligned to match the marketing site palette when we get to that stage.
> Do not apply navy/teal colors unless explicitly told to.

The colors below are PLACEHOLDER — subject to change to match the marketing site:

```typescript
// These override the default shadcn theme to match our brand
const colors = {
  primary: '#1B2A4A',        // Navy — headers, sidebar, primary buttons
  secondary: '#2E75B6',      // Blue — links, active states
  accent: '#0D9488',         // Teal — success, approved badges, CTAs
  warning: '#B45309',        // Amber — needs-review, yellow flags
  destructive: '#DC2626',    // Red — blocked, errors, risky flags
  background: '#F0F4F8',     // Light gray — page backgrounds
  foreground: '#111827',     // Dark gray — body text
  muted: '#6B7280',          // Gray — secondary text, metadata
};
```

---

## CODING STANDARDS

### TypeScript:
- Strict mode always on
- No `any` types (use `unknown` and type guards instead)
- All function parameters and return types must be typed
- Use Zod schemas for runtime validation at API boundaries
- Use Prisma-generated types for database models

### Components:
- All components are functional (no class components)
- Use Server Components by default; add `'use client'` only when needed
- Props interfaces defined above the component
- Destructure props in the function signature
- Use `cn()` utility for conditional classes (from shadcn)

### File Naming:
- Components: `kebab-case.tsx` (e.g., `grant-form.tsx`)
- Types: `kebab-case.ts` (e.g., `grant.ts`)
- Utilities: `kebab-case.ts` (e.g., `compliance-rules.ts`)
- API routes: `route.ts` inside folder structure

### Error Handling:
- Every API route wrapped in try/catch
- Every async component wrapped in error boundary
- User-facing errors are clear and actionable
- Technical errors logged to Sentry, not shown to users
- Never expose stack traces, SQL errors, or internal details

### Security:
- All inputs validated with Zod before processing
- All database queries parameterized (Prisma handles this)
- CSRF protection on all mutation endpoints
- Rate limiting on auth and financial endpoints
- Sensitive data encrypted at rest
- No secrets in client-side code (use environment variables)
- Environment variables: NEXT_PUBLIC_ prefix ONLY for non-sensitive values

---

## WHAT NOT TO DO — COMMON MISTAKES TO AVOID

1. ❌ Do NOT store financial amounts as Float or Number. Use Decimal/String.
2. ❌ Do NOT hard-delete any financial record. Soft-delete only.
3. ❌ Do NOT return data from other organizations in API responses.
4. ❌ Do NOT trust client-side role checks alone. Always verify server-side.
5. ❌ Do NOT log sensitive data (card numbers, bank details, SSN).
6. ❌ Do NOT skip the compliance disclaimer on risk classification screens.
7. ❌ Do NOT create separate codebases for each dashboard. One app, role-based views.
8. ❌ Do NOT use Bootstrap, jQuery, or Firebase. See banned technologies list.
9. ❌ Do NOT modify shadcn/ui component files directly. Create wrapper components.
10. ❌ Do NOT store passwords, card numbers, or bank credentials. Use Stripe/Plaid/Auth provider.
11. ❌ Do NOT skip audit logging. Every data mutation gets an audit log entry.
12. ❌ Do NOT use `any` type. Use `unknown` with type guards.

---

## TEMPLATE SOURCE

The UI is built from the **WowDash Tailwind & Next.js Admin Dashboard with Shadcn UI** template.
- Filename: `wowdash-tailwind-nextjs-admin-dashboard-shadcn-2026-03-07-16-01-18-utc`
- Author: wowtheme7
- Stack: Next.js 16.1.1, React 19.2.3, TypeScript 5.8.3, Tailwind v4, shadcn/ui, NextAuth v5
- 18 dashboard demos to pull layouts from (Finance, CRM, Analytics, SaaS, etc.)
- 397 TypeScript files, 27 shadcn UI components

Key demos to use as base layouts:
- **Finance & Banking** → Nonprofit Admin Dashboard
- **CRM** → Beneficiary management, vendor management
- **Analytics** → Platform Admin metrics, CPA reports
- **SaaS** → Subscription tracking
- **Project Management** → Grant workspace

---

## ENVIRONMENT VARIABLES

```env
# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
DATABASE_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Plaid
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox  # sandbox | development | production

# Email
POSTMARK_API_TOKEN=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=
```

---

## REMEMBER

This platform protects vulnerable people's government benefits. A sloppy expense classification could cause someone to lose their SSI or Medi-Cal. A data breach could expose disability status. A compliance error could cost a nonprofit its 501(c)(3) status.

Code like it matters. Because it does.

---

## Security Standard (marketing repo)

This repo maintains zero tolerance for known npm vulnerabilities in `main`. Vulnerabilities must be remediated via one of three paths:

1. Upgrade to patched version
2. Swap to a maintained alternative
3. Document in `docs/security-exceptions.md` with specific justification (attack surface analysis, exploitability assessment, monitoring plan)

"Not currently exploitable" is not sufficient justification on its own. Security hygiene compounds — we fix everything, so we're in practice when something critical lands.

### Baseline requirements

- `.npmrc` with `ignore-scripts=true` and `save-exact=true`
- `package-lock.json` committed
- Exact version pinning on all production dependencies (no `^` or `~` ranges in the `dependencies` block)
- `npm audit` output clean, or every residual vulnerability documented in `docs/security-exceptions.md`

### Before any dependency change

- Run `npm audit` and confirm the delta vs. the current baseline
- Run `npm run build` and visually verify the homepage + one other page
- For major version bumps, read the upstream CHANGELOG/release notes and grep the codebase for affected APIs before installing

---

## TWO PROJECTS — TWO REPOSITORIES

This platform is TWO separate codebases deployed independently. Never mix them.

### Project 1: The Application (5 Dashboards)
- **Repository name**: `benefits-safe-app` (or your chosen name)
- **Template**: WowDash Tailwind & Next.js Admin Dashboard with Shadcn UI
- **Filename**: `wowdash-tailwind-nextjs-admin-dashboard-shadcn-2026-03-07-16-01-18-utc`
- **Author**: wowtheme7
- **Domain**: `app.yourplatform.com`
- **Verified Stack**:
  - Next.js 16.1.1
  - React 19.2.3
  - React-DOM 19.2.3
  - TypeScript 5.8.3
  - Tailwind CSS v4 (with tailwind-merge and @tailwindcss/postcss)
  - shadcn/ui (27 components, "new-york" style, RSC enabled)
  - NextAuth v5 (Google, GitHub, Credentials providers)
  - React Hook Form + Zod
  - ApexCharts
  - Lucide React
  - 18 dashboard demos, 397 TypeScript files
  - **ZERO Bootstrap. ZERO jQuery. ZERO Firebase. ZERO MongoDB.**
- **Contains**: All 5 dashboards (nonprofit admin, beneficiary, CPA, vendor, platform admin) via role-based routing in ONE codebase.

### Project 2: The Marketing Website
- **Repository name**: `benefits-safe-marketing` (or your chosen name)
- **Template**: Azzle AI Technology & Startup Next.js Template
- **Folder name**: `azzle-ai-next`
- **Author**: FavDevs (via Envato Elements)
- **Domain**: `www.yourplatform.com`
- **Verified Stack** (verified via check-stack.sh on 2026-03-12):
  - Next.js 14.1.0
  - React 18
  - Tailwind CSS 3.3.0
  - No TypeScript (plain JSX — acceptable for a marketing site)
  - **ZERO Bootstrap. ZERO jQuery. ZERO Firebase. ZERO MongoDB.**
- **Contains**: Homepage, features, pricing, blog, about, contact, FAQ pages. NO backend. NO database. NO authentication. Just beautiful static pages.
- **Connects to app via**: Login/Signup buttons in header link to `app.yourplatform.com/auth/login` and `app.yourplatform.com/auth/register`

### RULE: Never install Bootstrap, jQuery, Firebase, or MongoDB in EITHER project. If a package tries to add Bootstrap as a dependency, reject it.

---

## MARKETING SITE — PAGES TO BUILD

Using the Azzle AI Next.js template, customize these pages:

| Page | URL Path | Content |
|------|----------|---------|
| Homepage | `/` | Hero headline: "Disburse grant funds without detonating benefits." Value proposition. 3-6 feature cards. Social proof. CTA button → app signup. |
| Features | `/features` | Compliance engine, virtual cards, grant management, restricted fund ledger, CPA portal, vendor management, ABLE/trust awareness. |
| Pricing | `/pricing` | Four tiers: Starter ($49/mo), Growth ($149/mo), Professional ($349/mo), Enterprise (custom). Feature comparison table. Annual discount toggle. |
| Blog | `/blog` | Blog listing. SEO articles: SSI-safe grant disbursement, ABLE accounts for nonprofits, fiscal sponsor compliance, Medi-Cal asset limits 2026. |
| Blog Post | `/blog/[slug]` | Individual article page with proper metadata for SEO. |
| About | `/about` | Mission, story, why this product exists, team. |
| Contact | `/contact` | Simple contact form. Email address. |
| FAQ | `/faq` | Common questions about compliance, pricing, security, setup. |
| 404 | `/not-found` | Clean error page. |

### Marketing Site Color Palette (apply in Tailwind config):
Use the SAME brand colors as the app so both sites feel like one brand:
- Primary: `#1B2A4A` (Navy)
- Secondary: `#2E75B6` (Blue)
- Accent: `#0D9488` (Teal)
- Background: `#F0F4F8` (Light Gray)
- Text: `#111827` (Dark Gray)

### Marketing Site Header Buttons:
```jsx
// These link to the APP, not pages on the marketing site
<Link href="https://app.yourplatform.com/auth/login">Log In</Link>
<Link href="https://app.yourplatform.com/auth/register">Sign Up Free</Link>
```

---

## TECH STACK VERIFICATION COMMAND

Run this in the terminal from any project root to verify the tech stack:

```bash
#!/bin/bash
echo "===== TECH STACK VERIFICATION ====="
echo ""
echo "--- CHECKING package.json ---"
echo ""

echo "NEXT.JS:"
grep '"next"' package.json || echo "  NOT FOUND (BAD)"

echo ""
echo "REACT:"
grep '"react"' package.json | head -1 || echo "  NOT FOUND (BAD)"

echo ""
echo "TAILWIND CSS:"
grep -i 'tailwind' package.json || echo "  NOT FOUND (BAD)"

echo ""
echo "TYPESCRIPT:"
grep '"typescript"' package.json || echo "  Not found (optional for marketing site)"

echo ""
echo "===== BANNED TECHNOLOGIES ====="
echo "(All lines below should say NOT FOUND)"
echo ""

echo "BOOTSTRAP:"
grep -i 'bootstrap' package.json || echo "  NOT FOUND (GOOD)"

echo ""
echo "JQUERY:"
grep -i 'jquery' package.json || echo "  NOT FOUND (GOOD)"

echo ""
echo "FIREBASE:"
grep -i 'firebase' package.json || echo "  NOT FOUND (GOOD)"

echo ""
echo "MONGODB:"
grep -i 'mongo' package.json || echo "  NOT FOUND (GOOD)"

echo ""
echo "===== DONE ====="
```

Save this as `check-stack.sh` in your home directory. Run it with `bash ~/check-stack.sh` from any project folder.

### Expected output for the APP (WowDash):
```
NEXT.JS:      "next": "16.1.1"
REACT:        "react": "19.2.3"
TAILWIND CSS: "tailwindcss": "^4"
TYPESCRIPT:   "typescript": "^5.8.3"
BOOTSTRAP:    NOT FOUND (GOOD)
JQUERY:       NOT FOUND (GOOD)
FIREBASE:     NOT FOUND (GOOD)
MONGODB:      NOT FOUND (GOOD)
```

### Expected output for the MARKETING SITE (Azzle):
```
NEXT.JS:      "next": "14.1.0"
REACT:        "react": "^18"
TAILWIND CSS: "tailwindcss": "^3.3.0"
TYPESCRIPT:   Not found (optional for marketing site)
BOOTSTRAP:    NOT FOUND (GOOD)
JQUERY:       NOT FOUND (GOOD)
FIREBASE:     NOT FOUND (GOOD)
MONGODB:      NOT FOUND (GOOD)
```

If any banned technology shows a version number instead of "NOT FOUND," STOP and investigate before writing any code.

---

## REFERENCE-ONLY TEMPLATE (DO NOT BUILD FROM)

There is a third template downloaded for DESIGN REFERENCE ONLY:
- **Name**: WowDash React TypeScript shadcn (Vite version)
- **Filename**: `wowdash-react-typescript-shadcn`
- **Stack**: React 19, Vite 7, Tailwind v4, TypeScript, shadcn/ui, Firebase Auth, react-router-dom
- **Purpose**: Browse for extra component ideas and page layout inspiration. Has 12 dashboard demos.
- **DO NOT build from this. DO NOT deploy this. DO NOT copy code directly from this into the production app without converting it to Next.js App Router patterns.**
- **Why not production**: It's a client-side SPA (Vite + react-router-dom), not Next.js. No SSR, no API routes, no SEO. Firebase auth instead of NextAuth.

---

## COMPLETE DOCUMENT LIBRARY

These documents contain the full business logic, legal framework, market analysis, and technical specifications:

| # | Document | What It Contains |
|---|----------|-----------------|
| 1 | **PRD** (prd-benefits-safe-grant-platform.docx) | 22 sections: legal framework for SSI/Medi-Cal safe disbursement, three-party grant model, user roles & permissions, full data model, core features, grant workspace & budget management, virtual card operations, vendor management & approval workflow, subscription payment flow, compliance engine, receipt management, reporting/CPA/tax compliance, notifications, integrations, security standards, UI design, pricing model, development roadmap, appendices with sample policies and SSI-safe expense categories. |
| 2 | **PRD Addendum** (prd-addendum.docx) | Part 1: Legal entity & liability shield, terms of service & legal agreements (7 documents needed), data privacy (CCPA/CPRA/HIPAA/ADA), security hardening (SOC 2, MFA, pen testing, WAF, incident response), WCAG 2.1 AA accessibility, multi-state compliance roadmap, disaster recovery, customer support, fraud prevention, API & white-label opportunity, onboarding & training, internal analytics. Part 2: Revenue model with 5-year projections, unit economics, refined 4-tier pricing, additional revenue streams, path to profitability, GTM strategy, competitive moat. Part 3: Pre-launch checklist. |
| 3 | **Market Analysis** (market-projections.docx) | Verified data: 7.5M SSI recipients, 14M ABLE-eligible, 1.9M US nonprofits, 214K ABLE accounts opened (1.5% adoption). Three financial scenarios (Conservative: $7.4M ARR Year 5, Base: $21M ARR Year 5, Aggressive: $67.5M ARR Year 5). Blind spots: money transmitter licensing, fiduciary risk, True Link Financial competitor, nonprofit political risk, grant cycle dependency, beneficiary digital literacy. Complete glossary of all acronyms. |
| 4 | **Technical Blueprint** (technical-blueprint.docx) | Build vs buy decisions, full tech stack with rationale, modular monolith architecture, two build paths compared (bootstrap vs agency), 6-month MVP timeline month-by-month, Year 1 cost breakdown ($335K-$500K), hiring guide with red flags, 5 success factors, 5 failure factors, first 90 days launch sequence. |
| 5 | **Template Guide** (template-guide.docx) | Dashboard inventory, template recommendations, rejected templates list, color palette, developer setup instructions. |
| 6 | **Project Handoff** (project-handoff.docx) | Complete summary of all decisions for continuing in new conversations. Template verification results, marketing site requirements, continuation instructions. |

### If Claude AI needs business context for a feature, refer to these documents. The PRD (document 1) has the most detailed feature specifications. The compliance rules are in PRD Section 13.

---

## FIRST WEEK DEVELOPMENT TASKS

### Day 1-2: Project Setup
1. Create new Next.js project from WowDash template
2. Remove demo data and unused demo pages (NFT, Medical, Podcast, etc.)
3. Set up Git repository, .gitignore, initial commit
4. Configure environment variables (.env.local)
5. Set up PostgreSQL database (Supabase or local Docker)
6. Initialize Prisma with the schema from this CLAUDE.md
7. Run `prisma migrate dev` to create all tables
8. Run `prisma generate` to create type-safe client
9. Verify the app runs: `npm run dev`

### Day 3-4: Auth & Role System
1. Configure NextAuth v5 with Google + Credentials providers
2. Create User model seeding script with one user per role
3. Build role-based sidebar navigation (from the getNavItems function in this file)
4. Build middleware to protect routes by role
5. Build permission utility functions
6. Test: log in as each role and verify correct sidebar appears

### Day 5: Core Data Models
1. Build Grant CRUD (create, read, update, soft-delete)
2. Build BudgetCategory management within grants
3. Build Grant list and detail pages for nonprofit admin
4. Build basic API routes for grants (/api/grants)
5. Wire up forms with React Hook Form + Zod validation
6. Create first AuditLog entries on grant creation

### Day 6-7: Expense & Vendor Foundation
1. Build ExpenseRequest submission form (beneficiary portal)
2. Build expense approval queue (nonprofit admin)
3. Build Vendor creation and approval workflow
4. Build compliance risk classification (basic version)
5. Wire up the DisbursementPolicy model
6. Test end-to-end: beneficiary submits expense → admin sees it → approves/rejects

---

## REMEMBER

This platform protects vulnerable people's government benefits. A sloppy expense classification could cause someone to lose their SSI or Medi-Cal. A data breach could expose disability status. A compliance error could cost a nonprofit its 501(c)(3) status.

Code like it matters. Because it does.

---

## Security Standard (marketing repo)

This repo maintains zero tolerance for known npm vulnerabilities in `main`. Vulnerabilities must be remediated via one of three paths:

1. Upgrade to patched version
2. Swap to a maintained alternative
3. Document in `docs/security-exceptions.md` with specific justification (attack surface analysis, exploitability assessment, monitoring plan)

"Not currently exploitable" is not sufficient justification on its own. Security hygiene compounds — we fix everything, so we're in practice when something critical lands.

### Baseline requirements

- `.npmrc` with `ignore-scripts=true` and `save-exact=true`
- `package-lock.json` committed
- Exact version pinning on all production dependencies (no `^` or `~` ranges in the `dependencies` block)
- `npm audit` output clean, or every residual vulnerability documented in `docs/security-exceptions.md`

### Before any dependency change

- Run `npm audit` and confirm the delta vs. the current baseline
- Run `npm run build` and visually verify the homepage + one other page
- For major version bumps, read the upstream CHANGELOG/release notes and grep the codebase for affected APIs before installing
