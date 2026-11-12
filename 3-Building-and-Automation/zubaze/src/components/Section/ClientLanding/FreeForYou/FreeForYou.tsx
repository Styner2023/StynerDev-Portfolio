import { Link } from "react-router-dom";

const points = [
  {
    icon: "/assets/images/v3/icon1.png",
    title: "Your developer pays",
    description:
      "Your developer or agency subscribes to Zubaze and adds your websites to your private dashboard. There's nothing for you to buy.",
  },
  {
    icon: "/assets/images/v3/icon2.png",
    title: "You just log in",
    description:
      "Sign in with the invite from your developer, or create your free client account in seconds. No setup, no software to install.",
  },
  {
    icon: "/assets/images/v3/icon3.png",
    title: "Always ready for you",
    description:
      "Your websites stay in one place — set up and kept current by your developer, ready whenever you want to update your text, images, or videos.",
  },
];

const FreeForYouSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Zubaze is free for you</h2>
          <p>
            Zubaze is paid for by developers and agencies — not their clients.
            As a client, you simply log in to see and reach all of your
            websites. Nothing to pay, nothing to manage.
          </p>
        </div>
        <div className="row">
          {points.map((point) => (
            <div className="col-lg-4 col-md-6 d-flex" key={point.title}>
              <div className="zubuz-iconbox-wrap center">
                <div className="zubuz-iconbox-icon">
                  <img src={point.icon} alt={point.title} />
                </div>
                <div className="zubuz-iconbox-data">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="zubuz-section-title center">
          <div className="zubaz-cta-buttons">
            <Link className="zubuz-default-btn pill" to="/client-sign-up">
              <span>Create Your Client Account</span>
            </Link>
            <Link
              className="zubuz-default-btn pill outline-btn"
              to="/client-sign-in"
            >
              <span>Client Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeForYouSection;
