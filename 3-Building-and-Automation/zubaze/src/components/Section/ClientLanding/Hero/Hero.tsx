import { useSearchParams, Link } from "react-router-dom";
import '../client-sections.css';

const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const dashboardUrl = searchParams.get('dashboard');
  const qs = dashboardUrl ? `?dashboard=${dashboardUrl}` : '';

  return (
    <div className="zubuz-hero-section zubuz-client-hero">
      <span className="zubuz-hero-shape-float shape-a">
        <img src="/assets/images/v2/shape1-v2b.png" alt="" />
      </span>
      <span className="zubuz-hero-shape-float shape-b">
        <img src="/assets/images/v2/shape2-v2.png" alt="" />
      </span>
      <span className="zubuz-hero-shape-float shape-c">
        <img src="/assets/images/v2/shape3-v2.png" alt="" />
      </span>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="zubuz-hero-thumb3">
              <img src="/assets/images/v3/thumb-v3-01.png" alt="" />
              <div className="zubuz-hero-thumb-card1">
                <img src="/assets/images/v3/card-v3-1.png" alt="" />
              </div>
              <div className="zubuz-hero-thumb-card2">
                <img src="/assets/images/v3/card-v3-2.png" alt="" />
              </div>
              <div className="zubuz-hero-thumb-card3">
                <img src="/assets/images/v3/card-v3-3.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="zubuz-hero-content">
              <h1>Your Personal Website Dashboard</h1>
              <p>
                Your developer built your website and set up this private dashboard for you. Log in, click your site, and update your own text, images, and videos — anytime. Only you can see your sites.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubaz-cta-buttons">
                  <Link
                    to={`/client-sign-up${qs}`}
                    className="zubuz-default-btn zubuz-client-btn"
                  >
                    <span>Sign Up as Client</span>
                  </Link>
                  <Link
                    to={`/client-sign-in${qs}`}
                    className="zubuz-default-btn outline-btn"
                  >
                    <span>Client Login</span>
                  </Link>
                </div>
                <div className="zubuz-icon-list">
                  <ul>
                    <li>
                      <img src="/assets/images/v3/check.png" alt="" /> All your websites in one place
                    </li>
                    <li>
                      <img src="/assets/images/v3/check.png" alt="" /> Edit your own text, images &amp; videos
                    </li>
                    <li>
                      <img src="/assets/images/v3/check.png" alt="" /> Private — only you see your sites
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
