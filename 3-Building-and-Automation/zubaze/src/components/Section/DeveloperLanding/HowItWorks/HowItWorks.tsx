type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Sign up as a developer",
    description:
      "Create your free Zubaze workspace in under a minute. No credit card, no setup wizard.",
  },
  {
    number: "02",
    title: "Add your clients & their sites",
    description:
      "Drop in live URLs, CMS logins, admin panel links — everything a client needs to find their project.",
  },
  {
    number: "03",
    title: "Send a one-click invite",
    description:
      "Your client gets a personalized dashboard URL. No accounts to create, no Slack channels to join.",
  },
  {
    number: "04",
    title: "Clients self-serve from day one",
    description:
      "They click through to live sites and CMS panels on their own. Your inbox finally gets a break.",
  },
];

const HowItWorks = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>From signup to client onboarded in under 10 minutes</h2>
          <p>
            Zubaze replaces the spreadsheets, password docs, and "where's the
            link?" emails. Four steps and your portfolio runs itself.
          </p>
        </div>
        <div className="row">
          {steps.map((step) => (
            <div className="col-lg-3 col-md-6 d-flex" key={step.number}>
              <div className="zubuz-iconbox-wrap center w-100">
                <div className="zubuz-iconbox-icon">
                  <span className="h5">{step.number}</span>
                </div>
                <div className="zubuz-iconbox-data">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
