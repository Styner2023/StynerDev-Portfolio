import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className="zubuz-hero-section2" style={{ paddingTop: "70px" }}>
      <div className="container">
        <div className="row zubuz_screenfix_right">
          <div className="col-lg-6">
            <div className="zubuz-hero-content">
              <div className="zubuz-hero-rating">
                <ul>
                  <li>
                    <img src="/assets/images/v2/rating.png" alt="" />
                  </li>
                  <li>Built for freelancers, agencies, and studios</li>
                </ul>
              </div>
              <h1>The dashboard your clients deserve — without the dev work</h1>
              <p>
                Zubaze gives developers a clean place to organize every client's
                live URLs, CMS logins, and admin panels. Onboard a new client in
                minutes — and never store a single file of their code.
              </p>
              <div className="zubuz-hero-btn-wrap">
                <Link to="/sign-up" className="zubuz-default-btn pill">
                  <span>Start Free</span>
                </Link>
                <Link to="/developer-sign-in" className="zubuz-default-btn pill outline-btn">
                  <span>Developer Login</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="zubuz-hero-thumb2">
              <img src="/assets/images/v2/dashboard.png" alt="" />
              <div className="zubuz-hero-shape2">
                <img src="/assets/images/v2/shape1-v2.png" alt="" />
              </div>
              <div className="zubuz-hero-shape3">
                <img src="/assets/images/v2/shape2-v2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
