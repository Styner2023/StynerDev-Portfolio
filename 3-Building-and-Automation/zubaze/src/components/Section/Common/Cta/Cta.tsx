import { Link } from "react-router-dom";
import "./Cta.css";

const Cta = () => {
  return (
    <div className="zubuz-cta-section blue-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 order-lg-2 d-flex align-items-center">
            <div className="zubuz-default-content light">
              <h2>Ready to streamline your client workflow?</h2>
              <p>
                Join developers worldwide who trust Zubaze for organized client
                website management. Create your developer dashboard today and
                experience seamless client collaboration.
              </p>
              <div className="zubuz-extara-mt">
                <Link className="zubuz-default-btn white-btn" to="/developer">
                  <span>Start as Developer</span>
                </Link>
                <Link className="zubuz-default-btn outline-btn" to="/client">
                  <span>Client Access</span>
                </Link>
                <Link className="zubuz-default-btn" to="/service">
                  <span>View All Solutions</span>
                </Link>
                <span className="zubuz-title-shape">
                  <img src="/assets/images/v1/shape2.png" alt="Green decorative arrow" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="zubuz-cta-thumb">
              <img src="/assets/images/v1/cta-mocup.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
