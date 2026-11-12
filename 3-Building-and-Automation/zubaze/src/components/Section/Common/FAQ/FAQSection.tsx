import Accordion from "react-bootstrap/Accordion";

type Faq = {
  question: string;
  answer: string;
};

const developerFaqs: Faq[] = [
  {
    question: "Do you store my client's code?",
    answer:
      "No, never. Zubaze only organizes links to your client's live sites and CMS dashboards. Your code stays wherever you already host it — GitHub, Netlify, Vercel, or your own server.",
  },
  {
    question: "How fast can I onboard a new client?",
    answer:
      "Under five minutes. Create the client, paste in their live URL and CMS link, then hit invite. They land on a personalized dashboard at their own custom URL — with no setup on their end.",
  },
  {
    question: "Can my clients see each other's websites?",
    answer:
      "No. Each client's dashboard is isolated — they only see their own websites and project links. Logins are role-based and scoped to that client's account.",
  },
  {
    question: "Can I brand the dashboard as my own studio or agency?",
    answer:
      "Yes. On paid plans you can add your logo, set a custom dashboard URL, and use your own domain. Clients experience it as your studio's platform, not as a Zubaze page.",
  },
  {
    question: "What does it cost to get started?",
    answer:
      "Nothing. The Free plan lets you manage a couple of clients with no card required. When you grow, the Freelancer, Agency, and Studio plans scale with your client list.",
  },
  {
    question: "Is my data secure, and is it really mine?",
    answer:
      "Sign-in is handled by Auth0, an industry-standard identity provider. You can export or delete everything at any time — no lock-in, and no hidden copies of your data.",
  },
];

export const clientFaqs: Faq[] = [
  {
    question: "Do I have to pay anything?",
    answer:
      "No. Zubaze is paid for by your developer or agency — it's completely free for you. There's nothing to buy and nothing to subscribe to.",
  },
  {
    question: "How do I get into my dashboard?",
    answer:
      "Your developer sends you an invite link. Create a free account or log in, and your dashboard is ready with your website(s) already added.",
  },
  {
    question: "What can I do once I'm in?",
    answer:
      "See all your websites in one place. Click any one to open it and update your own text, images, and videos — anytime, from any device.",
  },
  {
    question: "Can anyone else see my websites?",
    answer:
      "No. Your dashboard is private and scoped only to you. Other clients never see your sites, and you never see theirs.",
  },
  {
    question: "Do I need to install anything or know how to code?",
    answer:
      "Nothing to install and no code to touch. Just log in and edit your content — your developer set everything else up for you.",
  },
  {
    question: "Who do I contact if something's wrong with my site?",
    answer:
      "Your developer. They built and maintain your website, so reach out to them and they'll take care of it.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes. The Free plan lets you manage up to 2 clients with no credit card required — keep it as long as you like.",
  },
  {
    question: "Do my clients ever pay anything?",
    answer:
      "Never. Only you — the developer or agency — subscribe. Your clients get their dashboards completely free; there's nothing for them to buy.",
  },
  {
    question: "What counts as a \"client\"?",
    answer:
      "A client is one person or business you give a dashboard to. You can add as many websites per client as your plan allows.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Anytime. Upgrade as your client list grows or downgrade if it shrinks — changes take effect right away and we prorate the difference.",
  },
  {
    question: "What's the difference between monthly and annual billing?",
    answer:
      "Annual is billed once a year and works out cheaper than paying month to month. You can switch between them whenever you like.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No contract, no lock-in — cancel whenever you want and you keep access until the end of your billing period.",
  },
];

export const contactFaqs: Faq[] = [
  {
    question: "How quickly will I hear back?",
    answer:
      "We reply to most messages within one business day — often much sooner.",
  },
  {
    question: "What's the best way to reach support?",
    answer:
      "Send a message with the form above or email contact@zubaze.com. For account-specific help, include your workspace name so we can sort it out faster.",
  },
  {
    question: "Can you help me get set up?",
    answer:
      "Absolutely. Tell us a bit about your clients and we'll walk you through adding your first websites and sending client invites.",
  },
  {
    question: "Do you offer a demo or walkthrough?",
    answer:
      "Yes — mention it in your message and we'll arrange a quick walkthrough of how Zubaze fits your workflow.",
  },
  {
    question: "I'm a client, not a developer — who do I contact?",
    answer:
      "Reach out to the developer or agency who set up your dashboard. They manage your websites and can take care of any changes for you.",
  },
];

const FAQSection = ({ faqs = developerFaqs }: { faqs?: Faq[] }) => {
  return (
    <div className="section zubuz-section-padding2 light-bg">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="zubuz-accordion-wrap">
              <Accordion defaultActiveKey="0" flush>
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={String(index)} key={faq.question}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
