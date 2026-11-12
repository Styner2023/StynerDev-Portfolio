import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <div className="zubuz-hero-section white-bg zubuz-home-hero">
        <div className="container">
          <div className="zubuz-hero-content center position-relative">
            <h1>One dashboard for every client website you manage</h1>
            <p>
              Zubaze gives developers and agencies a clean way to organize client
              website access, CMS links, and project URLs — without ever storing
              your client's code. Onboard a client in minutes; give them a
              personalized dashboard for life.
            </p>
            <div className="zubuz-hero-btn-wrap center">
              <Link className="zubuz-default-btn" to="/sign-up">
                <span>Start Free</span>
              </Link>
              <Link className="zubuz-default-btn outline-btn" to="/pricing">
                <span>See Pricing</span>
              </Link>
            </div>
            <div className="zubuz-hero-shape">
              <img src="/assets/images/v1/shape.png" alt="img" />
            </div>
          </div>

          <div className="zubuz-hero-bottom">
            <div className="zubuz-hero-thumb wow fadeInUpX">
              <img
                src="/assets/images/v1/hero-mocup1.png"
                alt="img"
                width={348}
                height={501}
              />
            </div>
            <div className="zubuz-hero-card card1 wow zoomIn">
              <img
                src="/assets/images/v1/h-card1.png"
                alt="img"
                width={225}
                height={75}
              />
            </div>
            <div className="zubuz-hero-card card2 wow zoomIn">
              <img
                src="/assets/images/v1/h-card2.png"
                alt="img"
                width={224}
                height={224}
              />
            </div>
            <div className="zubuz-hero-card card3 wow zoomIn">
              <img
                src="/assets/images/v1/h-card4.png"
                alt="img"
                width={296}
                height={282}
              />
            </div>
            <div className="zubuz-hero-card card4 wow zoomIn">
              <img src="/assets/images/v1/h-card3.png" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
