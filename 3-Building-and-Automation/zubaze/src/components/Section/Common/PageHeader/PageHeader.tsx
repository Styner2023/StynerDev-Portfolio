import { Link } from "react-router-dom";
import "./PageHeader.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  /* Optional card image that floats over the hero dashboard image, used to
     vary the shared hero between pages. */
  overlayImage?: string;
  overlayAlt?: string;
}

const defaultSubtitle =
  "Zubaze gives developers and agencies a clean place to organize every client's website access, CMS logins, and project URLs — without ever storing a single file of their code.";

const PageHeader = ({
  title,
  subtitle = defaultSubtitle,
  image = "/assets/images/v2/dashboard.png",
  overlayImage,
  overlayAlt = "",
}: PageHeaderProps) => {
  const handleSeePricing = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const pricing = document.getElementById("zubuz-pricing");
    if (pricing) {
      e.preventDefault();
      pricing.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="zubuz-hero-section2">
      <div className="container">
        <div className="row zubuz_screenfix_right align-items-center">
          <div className="col-lg-6">
            <div className="zubuz-hero-content">
              <div className="zubuz-hero-rating">
                <ul>
                  <li>
                    <img src="/assets/images/v2/rating.png" alt="" />
                  </li>
                  <li>Trusted by developers, agencies, and studios</li>
                </ul>
              </div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <div className="zubuz-hero-btn-wrap">
                <Link to="/sign-up" className="zubuz-default-btn pill">
                  <span>Start Free</span>
                </Link>
                <Link
                  to="/pricing"
                  onClick={handleSeePricing}
                  className="zubuz-default-btn pill outline-btn"
                >
                  <span>See Pricing</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="zubuz-hero-thumb2">
              <img src={image} alt={title} />
              <div className="zubuz-hero-shape2">
                <img src="/assets/images/v2/shape1-v2.png" alt="" />
              </div>
              <div className="zubuz-hero-shape3">
                <img src="/assets/images/v2/shape2-v2.png" alt="" />
              </div>
              {overlayImage && (
                <div className="zubuz-hero-overlay-card">
                  <img src={overlayImage} alt={overlayAlt} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
