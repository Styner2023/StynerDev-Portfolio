import Link from 'next/link';
import Footer_02 from '@/components/footer/Footer_02';
import Header_02 from '@/components/header/Header_02';

export const metadata = {
  title: 'Security at BenefitsSafe',
  description:
    'The technical and organizational measures BenefitsSafe uses to protect Beneficiary PII, financial data, and Nonprofit records. Referenced by the BenefitsSafe Data Processing Agreement §4.7 and Privacy Policy §10.',
  openGraph: {
    title: 'Security at BenefitsSafe',
    description:
      'The technical and organizational measures BenefitsSafe uses to protect sensitive data.',
    url: 'https://benefitssafe.com/security',
    type: 'article',
  },
  alternates: { canonical: 'https://benefitssafe.com/security' },
  robots: { index: true, follow: true },
};

export default function SecurityPage() {
  return (
    <>
      <Header_02 />
      <main className="main-wrapper relative overflow-hidden bg-white">
        <section className="py-14 lg:py-20">
          <div className="global-container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-colorViolet">
                  Version 1.0 · Last updated April 21, 2026
                </p>
                <h1 className="mb-4 font-clashDisplay text-4xl font-medium leading-tight text-neutral-900 sm:text-5xl">
                  Security at BenefitsSafe
                </h1>
                <p className="text-lg leading-relaxed text-neutral-700">
                  Nonprofits trust BenefitsSafe with Beneficiary Social Security
                  Numbers, benefit-program enrollment data, and the grant funds that
                  keep vulnerable people housed and fed. This page describes the
                  specific technical and organizational measures we use to protect
                  that information. Every claim below is implemented in the current
                  production codebase and is referenced by{' '}
                  <Link href="/dpa" className="text-colorViolet underline">
                    Section 4 of our Data Processing Agreement
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-colorViolet underline">
                    Section 10 of our Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <article className="prose prose-lg max-w-none prose-headings:font-clashDisplay prose-headings:font-medium prose-a:text-colorViolet">
                <h2>What we do — and what we don&apos;t</h2>
                <p>
                  We are deliberate about the difference between &quot;implemented
                  today&quot; and &quot;on the roadmap.&quot; Legal teams reviewing
                  this page should treat the first list as current fact and the
                  second list as planned future state.
                </p>
                <h3>In place today</h3>
                <ul>
                  <li>
                    AES-256-GCM encryption at rest for sensitive Beneficiary fields
                    (SSN, DOB, full addresses) at the application layer, on top of
                    the AWS Aurora native storage encryption.
                  </li>
                  <li>
                    TLS 1.2 or higher enforced on every public endpoint. HTTP
                    Strict Transport Security is set with <code>max-age=63072000</code>{' '}
                    (2 years), <code>includeSubDomains</code>, and{' '}
                    <code>preload</code>.
                  </li>
                  <li>
                    Multi-factor authentication (TOTP) available for every user and
                    required for administrative and platform-staff accounts.
                  </li>
                  <li>
                    Session fingerprinting (hashed IP + User-Agent) to detect
                    session-cookie theft, with automatic flagging on sensitive
                    routes.
                  </li>
                  <li>
                    Rate limiting on authentication, registration, password reset,
                    and financial endpoints using Upstash serverless Redis.
                  </li>
                  <li>
                    Immutable application audit logs (every data mutation records
                    actor, timestamp, before/after values) retained for two years.
                  </li>
                  <li>
                    Organization-scoped queries enforced by middleware, auth guards,
                    and a convention linter that blocks merges if a route accesses
                    <code> session.user.role</code> directly or skips the
                    org-scoping helper.
                  </li>
                  <li>
                    Content Security Policy with <code>frame-ancestors &apos;none&apos;</code>,
                    Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy,
                    X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and
                    Permissions-Policy headers on every response.
                  </li>
                  <li>
                    Circuit breaker and per-call timeout budget on outbound Stripe
                    API calls to prevent a slow upstream from exhausting serverless
                    concurrency.
                  </li>
                  <li>
                    OFAC SDN sanctions screening on every Beneficiary before a card
                    is issued, plus periodic re-screening. Screening failures fail
                    closed — a transient OFAC outage blocks issuance rather than
                    allowing it.
                  </li>
                  <li>
                    Real-time Merchant Category Code (MCC) controls on virtual-card
                    authorizations to protect SSI / Medi-Cal / CalFresh eligibility.
                  </li>
                  <li>
                    npm supply-chain hardening: <code>.npmrc</code> sets{' '}
                    <code>ignore-scripts=true</code> to prevent malicious{' '}
                    <code>postinstall</code> scripts from running during
                    <code> npm install</code>. Dependency vulnerability scans run on
                    every build.
                  </li>
                  <li>
                    SPF, DKIM, and DMARC configured on benefitssafe.com to prevent
                    outbound email spoofing.
                  </li>
                  <li>
                    Secrets are stored in AWS Secrets Manager and exposed to
                    production runtimes via encrypted environment variables — never
                    committed to the repository.
                  </li>
                  <li>
                    S3 buckets are configured with no public access; bucket policies
                    require encrypted transit (TLS) and AES-256 encryption at rest.
                  </li>
                  <li>
                    AWS CloudTrail records all AWS API activity with KMS-encrypted
                    log delivery.
                  </li>
                  <li>
                    Code reviews against the OWASP Top 10 checklist before every
                    production deployment.
                  </li>
                </ul>
                <h3>Not in place today (planned or out of scope)</h3>
                <ul>
                  <li>
                    <strong>SOC 2 Type II certification</strong> is in progress.
                    Target completion: Q3 2026. Until we hold the report, we share
                    a NIST-Cybersecurity-Framework-aligned security-program letter
                    on request.
                  </li>
                  <li>
                    <strong>ISO 27001 certification</strong> is not currently
                    pursued.
                  </li>
                  <li>
                    <strong>PCI DSS certification</strong> is not applicable to
                    BenefitsSafe at the platform level — we do not store, process,
                    or transmit primary account numbers. Card data is handled
                    exclusively by Stripe, which holds PCI DSS Level 1 certification.
                  </li>
                  <li>
                    <strong>HIPAA</strong>: BenefitsSafe is not currently a HIPAA
                    Business Associate. If a Nonprofit&apos;s specific use case
                    requires us to handle Protected Health Information, contact{' '}
                    <a href="mailto:privacy@benefitssafe.com">
                      privacy@benefitssafe.com
                    </a>{' '}
                    to discuss a Business Associate Agreement before uploading PHI.
                  </li>
                  <li>
                    <strong>Third-party penetration testing</strong> is scheduled
                    for post-launch in Q3 2026. Interim assurance comes from
                    internal security reviews and dependency-CVE scanning.
                  </li>
                  <li>
                    <strong>24/7 Security Operations Center</strong>: BenefitsSafe
                    is currently a solo-founder operation. High-severity alerts
                    (from Sentry, Better Stack, and AWS CloudTrail) are routed to
                    an on-call channel that is monitored continuously; non-critical
                    alerts are triaged during business hours in Pacific Time.
                  </li>
                  <li>
                    <strong>Public bug bounty program</strong> is planned for Q3
                    2026. In the meantime, coordinated disclosure is welcomed at{' '}
                    <a href="mailto:security@benefitssafe.com">
                      security@benefitssafe.com
                    </a>
                    .
                  </li>
                </ul>

                <h2>Data encryption</h2>
                <ul>
                  <li>
                    <strong>At rest</strong>: AES-256-GCM at the application layer
                    for sensitive Beneficiary fields (SSN last 4, DOB, full
                    addresses). AWS Aurora native storage encryption (AES-256 via
                    AWS KMS) covers the entire database and all automated backups.
                  </li>
                  <li>
                    <strong>In transit</strong>: TLS 1.2 or higher on every
                    connection; HSTS preloaded with a 2-year max-age.
                  </li>
                  <li>
                    <strong>Key management</strong>: AWS KMS with key rotation
                    policies enabled on the customer-managed keys.
                  </li>
                  <li>
                    <strong>Secrets</strong>: AWS Secrets Manager with least-privilege
                    IAM policies. No secrets in source control.
                  </li>
                </ul>

                <h2>Access control</h2>
                <ul>
                  <li>
                    Role-based access control across twelve distinct roles
                    (nonprofit_admin, nonprofit_staff, beneficiary, cpa, auditor,
                    attorney, grant_officer, compliance_officer, support_agent,
                    billing_admin, vendor, platform_admin).
                  </li>
                  <li>
                    Organization-scoped queries are enforced at the middleware and
                    data-access layers. Cross-organization reads require an explicit
                    platform-admin breakglass path that is separately audited.
                  </li>
                  <li>
                    MFA (TOTP) available for every user, required for administrative
                    and platform-staff roles. Backup codes are stored hashed.
                  </li>
                  <li>
                    Session lifetime: 1 hour of inactivity; session token refreshed
                    every 15 minutes of active use. Session cookies are
                    <code> HttpOnly</code>, <code>Secure</code>,
                    <code> SameSite=Lax</code>, and use the <code>__Secure-</code> /
                    <code>__Host-</code> prefixes in production.
                  </li>
                  <li>
                    Login rate limiting (5 attempts per IP per minute) and
                    per-email login limiting to resist credential stuffing.
                  </li>
                </ul>

                <h2>Infrastructure security</h2>
                <ul>
                  <li>
                    Hosted on AWS (us-west-2 primary, us-east backup) and Vercel
                    for edge delivery. DNS and proxy for app.benefitssafe.com are
                    served by Cloudflare.
                  </li>
                  <li>
                    S3 buckets locked down: no public access, encryption-in-transit
                    policy required, server-side encryption enforced.
                  </li>
                  <li>
                    AWS CloudTrail captures API activity with KMS-encrypted log
                    delivery.
                  </li>
                  <li>
                    Database backups are encrypted and retained per the IRS 7-year
                    financial-records rule.
                  </li>
                  <li>
                    Disaster recovery: AWS Aurora multi-AZ deployment with
                    automatic failover. Recovery Point Objective (RPO): 1 hour.
                    Recovery Time Objective (RTO): 4 hours.
                  </li>
                </ul>

                <h2>Application security</h2>
                <ul>
                  <li>
                    Every HTTP input is validated at the API boundary with Zod
                    schemas; every database query is parameterized via the Prisma
                    ORM (SQL-injection-safe by construction).
                  </li>
                  <li>
                    Every route mutation generates an immutable AuditLog record
                    (actor, organization, entity type/ID, before/after values, IP).
                  </li>
                  <li>
                    Dependency CVE scanning runs on every build. Critical-severity
                    advisories are remediated within 7 days; high within 30 days.
                  </li>
                  <li>
                    <code>.npmrc</code> sets <code>ignore-scripts=true</code> to
                    neutralize malicious <code>postinstall</code> scripts from
                    transitive dependencies. BenefitsSafe verified non-exposure to
                    the March 2026 npm supply-chain incident involving axios.
                  </li>
                  <li>
                    OWASP Top 10 review is part of the pre-merge checklist for
                    every pull request that touches auth, money, or data access.
                  </li>
                </ul>

                <h2>Multi-tenancy and data isolation</h2>
                <p>
                  BenefitsSafe is designed for the ~1.9 million US 501(c)(3)
                  nonprofits with zero cross-organization data leakage. Isolation
                  is enforced at the database-access layer, not just the UI:
                </p>
                <ul>
                  <li>
                    Every Prisma query that reads Nonprofit-scoped data is written
                    through a helper that injects <code>organizationId</code> into
                    the <code>where</code> clause. Direct access via
                    <code> session.user.role</code> is blocked by the
                    <code> auth-guard</code> convention linter.
                  </li>
                  <li>
                    API routes that must read across organizations (for example,
                    platform-admin reports) use an explicit breakglass path that
                    writes a distinct AuditLog entry for every cross-org read.
                  </li>
                  <li>
                    Webhook handlers look up the affected organization from the
                    external identifier (Stripe account ID, subscription ID) before
                    mutating any data, and reject events for unknown accounts.
                  </li>
                </ul>

                <h2>Payment and card data security</h2>
                <ul>
                  <li>
                    BenefitsSafe does not store primary account numbers, card
                    numbers, CVVs, or bank-account routing numbers.
                  </li>
                  <li>
                    Card data is handled end-to-end by Stripe (PCI DSS Level 1
                    certified). Virtual cards are issued by Sutton Bank and Evolve
                    Bank & Trust, Members FDIC, via Stripe Issuing.
                  </li>
                  <li>
                    Nonprofit bank-account onboarding is handled through Stripe
                    Connect&apos;s native flow; BenefitsSafe receives only the
                    tokenized bank reference and the last four digits of the
                    account.
                  </li>
                  <li>
                    BenefitsSafe is out of PCI DSS scope at the platform level
                    because it does not touch cardholder data.
                  </li>
                </ul>

                <h2>Beneficiary privacy protections</h2>
                <ul>
                  <li>
                    Beneficiary PII (SSN, DOB, full address) is encrypted at rest
                    with AES-256-GCM at the application layer and never appears in
                    list-API responses.
                  </li>
                  <li>
                    Access to Beneficiary records requires authenticated Nonprofit
                    staff with an org-scoped role. Beneficiaries can access only
                    their own data.
                  </li>
                  <li>
                    OFAC sanctions screening runs on every Beneficiary before card
                    issuance and periodically thereafter. Stale screens (older than
                    30 days) fail closed at the card-authorization step.
                  </li>
                  <li>
                    Beneficiary benefit-program enrollment data (SSI, SSDI,
                    Medi-Cal, CalFresh, ABLE) is used only for the compliance
                    engine&apos;s risk classification; it is not shared with
                    third-party advertisers, data brokers, or government agencies
                    except under lawful process.
                  </li>
                  <li>
                    Real-time MCC controls on Stripe Issuing authorizations prevent
                    transactions that would likely disqualify a Beneficiary from
                    means-tested benefits.
                  </li>
                </ul>

                <h2>Incident response</h2>
                <ul>
                  <li>
                    <strong>Detection</strong>: alerts from Sentry (application
                    errors), Better Stack (log anomalies), AWS CloudTrail (API
                    misuse), and Stripe (webhook/auth anomalies) are routed to an
                    on-call channel. High-severity alerts page immediately;
                    non-critical alerts are triaged during Pacific-Time business
                    hours.
                  </li>
                  <li>
                    <strong>Containment</strong>: the on-call target is one hour
                    from the time a high-severity alert fires.
                  </li>
                  <li>
                    <strong>Nonprofit notification</strong>: BenefitsSafe will
                    notify the affected Nonprofit&apos;s privacy contact within{' '}
                    <strong>24 hours</strong> of confirmation of a Security Incident
                    that affects their data. Contents of the notice follow DPA §7.2
                    and California Civil Code §1798.82.
                  </li>
                  <li>
                    <strong>Regulatory notification</strong>: where GDPR Article 33
                    applies, the Nonprofit (as Data Controller) is responsible for
                    the 72-hour supervisory-authority filing; BenefitsSafe supplies
                    the facts and cooperates.
                  </li>
                  <li>
                    Post-incident reports (what happened, what we changed) are
                    shared with affected Nonprofits within 72 hours of containment.
                  </li>
                </ul>

                <h2>Responsible disclosure</h2>
                <ul>
                  <li>
                    Report vulnerabilities to{' '}
                    <a href="mailto:security@benefitssafe.com">
                      security@benefitssafe.com
                    </a>
                    .
                  </li>
                  <li>
                    We commit to acknowledge reports within 5 business days and to
                    keep researchers informed of remediation progress.
                  </li>
                  <li>
                    BenefitsSafe will not pursue legal action against good-faith
                    security researchers acting within scope and without exfiltrating
                    customer data.
                  </li>
                  <li>
                    A formal public bug bounty program is planned for Q3 2026.
                  </li>
                </ul>

                <h2>Compliance alignment</h2>
                <ul>
                  <li>
                    <strong>GDPR</strong>: processor obligations under Article 28
                    are met via the{' '}
                    <Link href="/dpa" className="text-colorViolet underline">
                      Data Processing Agreement
                    </Link>
                    .
                  </li>
                  <li>
                    <strong>CCPA / CPRA</strong>: consumer rights are disclosed in
                    the{' '}
                    <Link href="/privacy" className="text-colorViolet underline">
                      Privacy Policy §7.2
                    </Link>
                    . BenefitsSafe does not sell or share Personal Information as
                    defined by CCPA.
                  </li>
                  <li>
                    <strong>GLBA</strong>: to the extent applicable, the Safeguards
                    Rule (16 CFR Part 314) requirements for information security,
                    MFA, encryption, and access control are covered by the controls
                    above. Consumer GLBA privacy notices for cardholders are issued
                    by the card-issuing banks.
                  </li>
                  <li>
                    <strong>EFTA / Regulation E</strong>: error-resolution and
                    liability-limit procedures are disclosed in Section 14 of the
                    Privacy Policy and administered by the card-issuing banks.
                  </li>
                  <li>
                    <strong>SSA POMS</strong>: the compliance engine applies
                    federal SSI rules (and the California Medi-Cal / CalFresh
                    overlay) to classify expenses before they can be authorized,
                    so that Beneficiary eligibility is protected by default.
                  </li>
                  <li>
                    <strong>NIST Cybersecurity Framework</strong>: we map our
                    controls to Identify, Protect, Detect, Respond, and Recover;
                    mapping documentation is available under NDA.
                  </li>
                </ul>

                <h2>Employee and contractor security</h2>
                <ul>
                  <li>
                    BenefitsSafe is currently a solo-founder operation. Production
                    access is limited to the founder and, as the team grows, to
                    expressly authorized personnel.
                  </li>
                  <li>
                    All future staff and contractors with production access will
                    sign confidentiality agreements and be bound by the same data-
                    protection obligations.
                  </li>
                  <li>
                    All production access is logged via AWS CloudTrail and
                    reviewable on request.
                  </li>
                </ul>

                <h2>Physical security</h2>
                <p>
                  BenefitsSafe does not operate its own data centers. Physical
                  security is inherited from AWS (SOC 2 Type II, ISO 27001, PCI DSS
                  Level 1) and Vercel (SOC 2 Type II, ISO 27001). The company has
                  no on-premise servers or employee workstations that store
                  Beneficiary data.
                </p>

                <h2>Business continuity</h2>
                <ul>
                  <li>
                    Database backups: automated by AWS Aurora, encrypted, retained
                    for 7 years per IRS financial-records requirements, integrity
                    spot-checked quarterly.
                  </li>
                  <li>
                    Disaster recovery: multi-AZ Aurora deployment for automatic
                    failover; point-in-time recovery enabled.
                  </li>
                  <li>
                    Target Recovery Point Objective (RPO): 1 hour.
                  </li>
                  <li>
                    Target Recovery Time Objective (RTO): 4 hours.
                  </li>
                </ul>

                <h2>What Nonprofits can do</h2>
                <ul>
                  <li>Enable MFA on every staff account.</li>
                  <li>
                    Use strong, unique passwords managed by a reputable password
                    manager.
                  </li>
                  <li>
                    Review your organization&apos;s AuditLog and active sessions in
                    Settings at least monthly.
                  </li>
                  <li>
                    Revoke access for departing staff the same day; BenefitsSafe
                    makes this a one-click operation in the Team settings.
                  </li>
                  <li>
                    Train staff on phishing awareness. Legitimate BenefitsSafe
                    email always comes from a @benefitssafe.com domain and never
                    asks for passwords or SSN.
                  </li>
                  <li>
                    Report anything suspicious to{' '}
                    <a href="mailto:security@benefitssafe.com">
                      security@benefitssafe.com
                    </a>
                    .
                  </li>
                </ul>

                <h2>Contact</h2>
                <ul>
                  <li>
                    Security concerns and vulnerability reports:{' '}
                    <a href="mailto:security@benefitssafe.com">
                      security@benefitssafe.com
                    </a>
                  </li>
                  <li>
                    Data-privacy questions and data-subject requests:{' '}
                    <a href="mailto:privacy@benefitssafe.com">
                      privacy@benefitssafe.com
                    </a>
                  </li>
                  <li>
                    DPA requests and compliance documentation:{' '}
                    <a href="mailto:legal@benefitssafe.com">
                      legal@benefitssafe.com
                    </a>
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
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer_02 />
    </>
  );
}
