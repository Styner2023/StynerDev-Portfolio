import { Link } from "react-router-dom";
import '../client-sections.css';

const ServiceSection = () => {
  const zubaze_features = [
    {
      title: "All Your Websites",
      icon: "/assets/images/v3/icon1.png",
      description: "Every website your developer built for you, together in one place. No links to find, no logins to remember."
    },
    {
      title: "Click & Edit",
      icon: "/assets/images/v3/icon2.png",
      description: "Click your website's thumbnail to open it, then update the text, images, and videos yourself."
    },
    {
      title: "Only Yours",
      icon: "/assets/images/v3/icon3.png",
      description: "You only ever see your own sites. Other clients never see yours, and you never see theirs."
    },
    {
      title: "Always Current",
      icon: "/assets/images/v3/icon4.png",
      description: "See each site at a glance — what's live and when it was last updated. Your developer keeps it current."
    },
    {
      title: "Edit From Anywhere",
      icon: "/assets/images/v3/icon5.png",
      description: "Open your dashboard and update your site from any device — desktop, tablet, or phone, anytime."
    },
    {
      title: "Set Up by Your Developer",
      icon: "/assets/images/v3/icon6.png",
      description: "Your developer builds your site, adds it here, and sends you an invite. Nothing for you to install or set up."
    }
  ];

  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-7">
              <h2>Everything You Need to Update Your Website</h2>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <div className="zubuz-title-btn">
                <Link className="zubuz-default-btn pill" to="/client-sign-up">
                  <span>Get Started Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {zubaze_features.map((feature, index) => (
            <div key={index} className="col-xl-4 col-md-6">
              <div className="zubuz-iconbox-wrap">
                <div className="zubuz-iconbox-icon">
                  <img src={feature.icon} alt="" />
                </div>
                <div className="zubuz-iconbox-data">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
