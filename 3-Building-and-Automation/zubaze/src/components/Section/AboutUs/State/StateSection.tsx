const valueProps = [
  {
    icon: "/assets/images/v1/icon3.png",
    title: "Zero code stored",
    description:
      "Your client's code never touches our servers. Zubaze organizes links and dashboards, not files.",
  },
  {
    icon: "/assets/images/v1/icon6.png",
    title: "Onboard in under 10 minutes",
    description:
      "From signup to a client clicking into their own personalized dashboard — no setup on their end.",
  },
  {
    icon: "/assets/images/v1/icon4.png",
    title: "Role-scoped access",
    description:
      "Every client sees only their own websites. No client ever bumps into another client's projects.",
  },
  {
    icon: "/assets/images/v1/icon8.png",
    title: "Your data, always yours",
    description:
      "Export or delete everything at any time. No lock-in, no hidden copies — you stay in control.",
  },
];

const StateSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>What makes Zubaze different</h2>
        </div>
        <div className="row">
          {valueProps.map((item) => (
            <div className="col-lg-3 col-md-6 d-flex" key={item.title}>
              <div className="zubuz-iconbox-wrap center">
                <div className="zubuz-iconbox-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="zubuz-iconbox-data">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateSection;
