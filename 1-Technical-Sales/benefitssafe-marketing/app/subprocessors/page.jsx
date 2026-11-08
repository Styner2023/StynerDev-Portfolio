import Link from 'next/link';
import Footer_02 from '@/components/footer/Footer_02';
import Header_02 from '@/components/header/Header_02';

export const metadata = {
  title: 'Subprocessors | BenefitsSafe',
  description:
    'The third-party services BenefitsSafe uses to operate the platform, the data each one processes, and the contracts under which they handle it. Referenced by the BenefitsSafe Data Processing Agreement Appendix A.',
  openGraph: {
    title: 'Subprocessors | BenefitsSafe',
    description:
      'Authoritative list of BenefitsSafe subprocessors (DPA Appendix A).',
    url: 'https://benefitssafe.com/subprocessors',
    type: 'article',
  },
  alternates: { canonical: 'https://benefitssafe.com/subprocessors' },
  robots: { index: true, follow: true },
};

const SUBPROCESSORS = [
  {
    name: 'Stripe, Inc.',
    purpose:
      'Payment processing (Stripe Payments + Connect), card issuance (Stripe Issuing), subscription billing (Stripe Billing), Treasury Financial Accounts, Nonprofit ACH onboarding.',
    dataCategories:
      'Nonprofit business info (legal name, EIN, beneficial owners); Beneficiary cardholder name, DOB, address, and SSN for KYC; card transaction data (merchant, MCC, amount, timestamp, approval status); Nonprofit bank-account details for payouts.',
    location: 'United States',
    links: [
      { label: 'Privacy Policy', href: 'https://stripe.com/privacy' },
      { label: 'Services Agreement', href: 'https://stripe.com/legal' },
      { label: 'DPA', href: 'https://stripe.com/legal/dpa' },
    ],
    note: 'Virtual cards are issued by Sutton Bank and Evolve Bank & Trust (Members FDIC) as Stripe Issuing partners. Stripe handles all PCI DSS Level 1 obligations; BenefitsSafe does not store full card numbers, CVVs, or full bank account numbers.',
  },
  {
    name: 'Sutton Bank',
    purpose:
      'Card-issuing bank for Stripe Issuing. One of two partner banks that issue BenefitsSafe virtual cards.',
    dataCategories: 'Cardholder identity data (received via Stripe).',
    location: 'United States (Member FDIC)',
    links: [{ label: 'Stripe Issuing terms', href: 'https://stripe.com/legal/issuing' }],
  },
  {
    name: 'Evolve Bank & Trust',
    purpose:
      'Card-issuing bank for Stripe Issuing. One of two partner banks that issue BenefitsSafe virtual cards.',
    dataCategories: 'Cardholder identity data (received via Stripe).',
    location: 'United States (Member FDIC)',
    links: [{ label: 'Stripe Issuing terms', href: 'https://stripe.com/legal/issuing' }],
  },
  {
    name: 'Amazon Web Services, Inc.',
    purpose:
      'Primary cloud infrastructure: Aurora PostgreSQL database, S3 document storage, KMS key management. Database is encrypted at rest with AES-256 via AWS KMS.',
    dataCategories:
      'All platform data at rest (encrypted). Encrypted database backups are retained per the IRS 7-year financial-records rule.',
    location:
      'US-West (Oregon) primary; US-East (Virginia) secondary backup region.',
    links: [
      { label: 'Privacy Notice', href: 'https://aws.amazon.com/privacy/' },
      { label: 'GDPR Center', href: 'https://aws.amazon.com/compliance/gdpr-center/' },
    ],
    note: 'AWS maintains SOC 1, SOC 2 Type II, SOC 3, ISO 27001, and PCI DSS Level 1 certifications for the services we rely on.',
  },
  {
    name: 'Vercel, Inc.',
    purpose:
      'Application hosting and edge delivery for app.benefitssafe.com and benefitssafe.com. Stores encrypted environment variables for the running applications.',
    dataCategories:
      'HTTP request metadata (path, IP, user-agent), deployment logs, edge cache entries. No persistent PII storage.',
    location: 'United States (global edge network).',
    links: [{ label: 'Privacy Policy', href: 'https://vercel.com/legal/privacy-policy' }],
  },
  {
    name: 'Cloudflare, Inc.',
    purpose:
      'Authoritative DNS for benefitssafe.com. CDN + reverse-proxy for app.benefitssafe.com (sees HTTP request metadata for TLS-terminated traffic). Cloudflare Workers run the scheduled cron jobs that trigger internal reconciliation routes.',
    dataCategories:
      'HTTP request metadata: IP address, user-agent, path, response status. No persistent PII storage.',
    location: 'United States (global edge).',
    links: [{ label: 'Privacy Policy', href: 'https://www.cloudflare.com/privacypolicy/' }],
  },
  {
    name: 'Postmark (ActiveCampaign)',
    purpose:
      'Transactional email delivery: email verification, password reset, expense-approval notifications, billing receipts, compliance alerts.',
    dataCategories: 'Recipient email address, display name, message subject and body.',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://postmarkapp.com/privacy-policy' }],
  },
  {
    name: 'Sentry (Functional Software, Inc.)',
    purpose:
      'Error and performance monitoring for the application. Collects stack traces and context when an unhandled exception occurs so we can fix bugs quickly.',
    dataCategories:
      'Pseudonymized error traces, user ID (not email), URL path, user-agent. Known PII patterns (SSN, card numbers) are scrubbed before submission via [lib/sentry-scrub.ts].',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://sentry.io/privacy/' }],
  },
  {
    name: 'Upstash, Inc.',
    purpose:
      'Serverless Redis used for API rate limiting and ephemeral caches. QStash used as the asynchronous job queue that off-loads heavy processing from Stripe webhooks.',
    dataCategories:
      'Pseudonymized rate-limit keys and counters; job payloads referencing internal record IDs (no plaintext PII).',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://upstash.com/trust/privacy.pdf' }],
  },
  {
    name: 'Better Stack (Logtail)',
    purpose: 'Centralized application log storage and alerting.',
    dataCategories:
      'Application log lines with PII redacted before emission (user IDs retained; emails, SSN, card numbers scrubbed).',
    location: 'United States / EU.',
    links: [{ label: 'Privacy Policy', href: 'https://betterstack.com/privacy' }],
  },
  {
    name: 'Anthropic, PBC',
    purpose:
      'Compliance Assistant AI (Claude) answers compliance questions posed by authorized Nonprofit staff. The prompt includes compliance context and the question; it does not include Beneficiary SSN, full card numbers, or bank credentials.',
    dataCategories: 'Question text, compliance context (policy IDs, program names).',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://www.anthropic.com/legal/privacy' }],
  },
  {
    name: 'Composio, Inc.',
    purpose:
      'Workflow-automation platform for org-level integrations that the Nonprofit elects to enable (for example, forwarding an approval to a Slack channel the Nonprofit owns).',
    dataCategories:
      'Only the workflow-trigger metadata and payloads that the Nonprofit chooses to send through Composio. Disabled by default.',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://composio.dev/privacy' }],
  },
  {
    name: 'Google LLC (Google OAuth)',
    purpose:
      'Optional "Sign in with Google" for Nonprofit staff. Invoked only when a user chooses Google login.',
    dataCategories: 'Email address, name, profile image, Google account ID.',
    location: 'United States.',
    links: [{ label: 'Privacy Policy', href: 'https://policies.google.com/privacy' }],
  },
  {
    name: 'Microsoft Corporation (Microsoft Entra ID)',
    purpose:
      'Optional "Sign in with Microsoft" for Nonprofit staff. Invoked only when a user chooses Microsoft login.',
    dataCategories: 'Email address, name, Microsoft account ID.',
    location: 'United States.',
    links: [{ label: 'Privacy Statement', href: 'https://privacy.microsoft.com/privacystatement' }],
  },
];

export default function SubprocessorsPage() {
  return (
    <>
      <Header_02 />
      <main className="main-wrapper relative overflow-hidden bg-white">
        <section className="py-14 lg:py-20">
          <div className="global-container">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-colorViolet">
                  Version 1.0 · Last updated April 21, 2026
                </p>
                <h1 className="mb-4 font-clashDisplay text-4xl font-medium leading-tight text-neutral-900 sm:text-5xl">
                  Subprocessors
                </h1>
                <p className="text-lg leading-relaxed text-neutral-700">
                  BenefitsSafe uses the third-party services below to operate the
                  platform. These companies process limited amounts of your data on
                  BenefitsSafe&apos;s behalf under written contracts that require them
                  to protect your information. This page is the authoritative list
                  referenced by{' '}
                  <Link href="/dpa" className="text-colorViolet underline">
                    Appendix A of our Data Processing Agreement
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-colorViolet underline">
                    Section 6 of our Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <section className="prose prose-lg max-w-none prose-headings:font-clashDisplay prose-headings:font-medium prose-a:text-colorViolet">
                <h2>What is a subprocessor?</h2>
                <p>
                  Under GDPR Article 28 and CCPA §1798.140, a Nonprofit that uses
                  BenefitsSafe is the <strong>data controller</strong> — it decides
                  what Beneficiary data to collect and why. BenefitsSafe is the{' '}
                  <strong>data processor</strong> — we act on the Nonprofit&apos;s
                  instructions. The companies below are <strong>sub-processors</strong>{' '}
                  — third parties that BenefitsSafe engages to deliver narrow slices
                  of the service (hosting, email delivery, monitoring, etc.).
                </p>
                <p>
                  GDPR Article 28(2) requires us to list our sub-processors publicly
                  and to give Nonprofit customers a meaningful opportunity to object
                  before we add new ones. CCPA treats this disclosure as part of the
                  &quot;business purpose&quot; transparency obligation under
                  §1798.130. This page is how we satisfy both.
                </p>

                <h2>Current subprocessors</h2>
              </section>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-neutral-300 bg-neutral-50 text-left">
                      <th className="p-3 font-semibold text-neutral-900">Name</th>
                      <th className="p-3 font-semibold text-neutral-900">Purpose</th>
                      <th className="p-3 font-semibold text-neutral-900">Data categories</th>
                      <th className="p-3 font-semibold text-neutral-900">Location</th>
                      <th className="p-3 font-semibold text-neutral-900">Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBPROCESSORS.map((sp) => (
                      <tr
                        key={sp.name}
                        className="border-b border-neutral-200 align-top"
                      >
                        <td className="p-3 font-semibold text-neutral-900">
                          {sp.name}
                        </td>
                        <td className="p-3 text-neutral-700">
                          {sp.purpose}
                          {sp.note ? (
                            <span className="mt-2 block text-xs italic text-neutral-500">
                              {sp.note}
                            </span>
                          ) : null}
                        </td>
                        <td className="p-3 text-neutral-700">{sp.dataCategories}</td>
                        <td className="p-3 text-neutral-700">{sp.location}</td>
                        <td className="p-3">
                          <ul className="space-y-1">
                            {sp.links.map((l) => (
                              <li key={l.href}>
                                <a
                                  href={l.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-colorViolet underline"
                                >
                                  {l.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <section className="prose prose-lg mt-10 max-w-none prose-headings:font-clashDisplay prose-headings:font-medium prose-a:text-colorViolet">
                <h2>Who is not on this list</h2>
                <p>
                  OFAC sanctions screening is performed by calling the US Department
                  of the Treasury&apos;s public SDN search API directly. The
                  Treasury is a government agency, not a commercial sub-processor,
                  and we do not share Beneficiary data with any third-party
                  screening vendor.
                </p>
                <p>
                  BenefitsSafe does <strong>not</strong> use Plaid, Finicity, MX,
                  Teller, or any other third-party bank-aggregation service. Nonprofit
                  bank-account onboarding is handled exclusively through Stripe
                  Connect&apos;s native flow.
                </p>

                <h2>Data-sharing principles</h2>
                <ul>
                  <li>BenefitsSafe does not sell personal data to any third party.</li>
                  <li>
                    Sub-processors are contractually bound to process data only on
                    BenefitsSafe&apos;s documented instructions, consistent with the
                    DPA between each Nonprofit and BenefitsSafe.
                  </li>
                  <li>
                    Every sub-processor has signed a DPA or equivalent data-protection
                    terms with BenefitsSafe.
                  </li>
                  <li>
                    The data shared with each sub-processor is limited to what is
                    strictly necessary for the function we rely on them for.
                  </li>
                  <li>
                    BenefitsSafe reviews each sub-processor&apos;s security
                    certifications (SOC 2, ISO 27001, PCI DSS, DPF) at least
                    annually.
                  </li>
                </ul>

                <h2>Changes to this list</h2>
                <p>
                  BenefitsSafe will provide at least <strong>30 days&apos; notice</strong>{' '}
                  before engaging a new sub-processor or replacing an existing one.
                  Notice is delivered two ways: (1) an update to this page with an
                  updated version number and effective date; and (2) an email to the
                  privacy contact on file for each active Nonprofit. Nonprofits that
                  object on reasonable data-protection grounds may terminate the
                  affected subscription for cause and receive a pro rata refund of
                  pre-paid fees, as described in Section 5.3 of the DPA.
                </p>

                <h2>International data transfers</h2>
                <p>
                  Every sub-processor listed above is headquartered in the United
                  States. Where a sub-processor also maintains EU infrastructure
                  (for example, Better Stack), BenefitsSafe&apos;s account is
                  provisioned against US infrastructure. Nonprofit and Beneficiary
                  data does not leave the United States in the normal course of
                  processing.
                </p>
                <p>
                  If BenefitsSafe adds a sub-processor located outside the US in the
                  future, the transfer will be governed by the EU Standard
                  Contractual Clauses (Commission Implementing Decision (EU)
                  2021/914), the UK IDTA/Addendum where UK data is involved, or the
                  EU-US Data Privacy Framework where the recipient is
                  DPF-certified.
                </p>

                <h2>Audit and accountability</h2>
                <p>
                  BenefitsSafe relies on the following publicly verifiable
                  certifications held by its sub-processors:
                </p>
                <ul>
                  <li>
                    <strong>AWS</strong>: SOC 1, SOC 2 Type II, SOC 3, ISO 27001,
                    PCI DSS Level 1, HIPAA-eligible.
                  </li>
                  <li>
                    <strong>Stripe</strong>: SOC 1, SOC 2 Type II, PCI DSS Level 1.
                  </li>
                  <li>
                    <strong>Vercel</strong>: SOC 2 Type II, ISO 27001.
                  </li>
                  <li>
                    <strong>Cloudflare</strong>: SOC 2 Type II, ISO 27001, PCI DSS.
                  </li>
                </ul>
                <p>
                  BenefitsSafe&apos;s own SOC 2 Type II audit is planned for
                  completion in Q3 2026. Progress is published at{' '}
                  <Link href="/security" className="text-colorViolet underline">
                    /security
                  </Link>
                  .
                </p>

                <h2>Contact</h2>
                <p>
                  Questions about this list, DPA requests, or objections to a
                  new sub-processor:
                </p>
                <ul>
                  <li>
                    Privacy:{' '}
                    <a href="mailto:privacy@benefitssafe.com">
                      privacy@benefitssafe.com
                    </a>
                  </li>
                  <li>
                    Legal / DPA:{' '}
                    <a href="mailto:legal@benefitssafe.com">legal@benefitssafe.com</a>
                  </li>
                  <li>Mail: BenefitsSafe, Oakland, California</li>
                </ul>

                <h2>Version history</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Date</th>
                      <th>Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.0</td>
                      <td>April 21, 2026</td>
                      <td>Initial publication.</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer_02 />
    </>
  );
}
