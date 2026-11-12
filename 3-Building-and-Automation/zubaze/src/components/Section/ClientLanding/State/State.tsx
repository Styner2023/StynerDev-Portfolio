const valueProps = [
  {
    icon: "/assets/images/v3/icon1.png",
    title: "Everything in one place",
    description:
      "All your websites on a single dashboard — nothing to dig out of old emails or chat threads.",
  },
  {
    icon: "/assets/images/v3/icon2.png",
    title: "No passwords to chase",
    description:
      "Click your website's thumbnail and you're in. Your developer sets up the access — you just click and edit.",
  },
  {
    icon: "/assets/images/v3/icon3.png",
    title: "Only your sites, only you",
    description:
      "Your dashboard is private and scoped to you. You never see another client's projects, and they never see yours.",
  },
  {
    icon: "/assets/images/v3/icon4.png",
    title: "Edit it yourself",
    description:
      "Update your own text, images, and videos anytime. Your developer keeps the rest current for you.",
  },
];

const StateSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>What your dashboard does for you</h2>
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
