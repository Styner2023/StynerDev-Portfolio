import { Link } from "react-router-dom";

const IntegrationSectionTwo = () => {
  return (
    <div className="section zubuz-section-padding bg-light">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-8">
              <h2>Works with the tools your sites already run on</h2>
              <p>
                Zubaze links straight to the live sites, CMS dashboards, and
                everyday tools your developer already works in. Nothing to
                migrate, nothing new to learn.
              </p>
            </div>
            <div className="col-lg-4 d-flex align-items-center">
              <div className="zubuz-title-btn">
                <Link className="zubuz-default-btn pill" to="/integrations">
                  <span>Browse all integrations</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="zubuz-tools-wrap">
          {Array.from({ length: 12 }, (_, i) => (
            <div className="zubuz-tools-item" key={i}>
              <img src={`/assets/images/v2/tools/tools${i + 1}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationSectionTwo;
