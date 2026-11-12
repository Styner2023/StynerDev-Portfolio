
import FeatureCard from "../../../Ui/Cards/Feature";
import { Link } from "react-router-dom";
import "./Feature.css";

const FeatureSection = () => {
  const zubaze_features = [
    {
      title: "Developer Dashboard",
      icon: "/assets/images/v1/icon6.png",
      description: "Centralized workspace to manage all client websites, create accounts, and organize project access efficiently."
    },
    {
      title: "Client Portal",
      icon: "/assets/images/v1/icon5.png",
      description: "Personalized dashboards for clients with organized website cards and direct CMS access links."
    },
    {
      title: "URL Management",
      icon: "/assets/images/v1/icon4.png",
      description: "Effortless assignment of website URLs to specific clients without storing any code or files."
    },
    {
      title: "Secure Access",
      icon: "/assets/images/v1/icon3.png",
      description: "Advanced security measures ensure only authorized clients can access their designated websites."
    },
    {
      title: "Support Dev Payments",
      icon: "/assets/images/v1/icon2.png",
      description: "Clients can tip or support their developer directly from the dashboard with configurable payment links."
    },
    {
      title: "Smart Website Cards",
      icon: "/assets/images/v1/icon1.png",
      description: "Auto-fetched thumbnails with inline edit and delete actions keep every client portfolio tidy and current."
    }
  ];

  return (
    <div className="section zubuz-section-padding3 light-bg">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Complete platform for website collaboration</h2>
        </div>
        <div className="row">
          {zubaze_features?.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature?.title}
              icon={feature?.icon}
              description={feature?.description}
            />
          ))}
        </div>
        <div className="zubuz-section-title center zubuz-feature-cta">
          <Link className="zubuz-default-btn" to="/service">
            <span>Explore All Solutions</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
