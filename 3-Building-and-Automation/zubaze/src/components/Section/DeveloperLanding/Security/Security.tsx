import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Security.css";

const pillars = [
  {
    title: "Zero code storage, by design",
    icon: "/assets/images/v1/icon3.png",
    description:
      "Zubaze stores links, not files. Your code never leaves GitHub, Netlify, Vercel, or your own server — there's nothing of yours for us to lose.",
  },
  {
    title: "Sign-in secured by Auth0",
    icon: "/assets/images/v1/icon7.png",
    description:
      "Authentication is handled by Auth0, an industry-standard identity provider. No client passwords are ever stored in plain text — not by you, not by us.",
  },
  {
    title: "Role-scoped client access",
    icon: "/assets/images/v1/icon4.png",
    description:
      "Every invite is scoped to a single client. Each client sees only their own sites — clients never bump into each other's projects or links.",
  },
  {
    title: "You own your data",
    icon: "/assets/images/v1/icon8.png",
    description:
      "Export or delete everything any time. No lock-in, no hidden copies — when a client leaves, their access leaves with them.",
  },
];

const SecuritySection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="section zubuz-section-padding3 light-bg">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Built so you never have to explain a data breach to a client</h2>
          <p>
            Zubaze is a workspace for access, not a vault for your code. The
            safest data is the data we never store in the first place.
          </p>
        </div>
        <Slider {...settings} className="zubuz-security-slider">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <div className="zubuz-iconbox-wrap center">
                <div className="zubuz-iconbox-icon">
                  <img src={pillar.icon} alt={pillar.title} />
                </div>
                <div className="zubuz-iconbox-data">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SecuritySection;
