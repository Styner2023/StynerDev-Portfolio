import { Link } from "react-router-dom";
import "./Content.css";

const ContentSectionOne = () => {
  return (
    <div className="section zubuz-section-padding2 white-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="zubuz-thumb thumb-pr">
              <img src="/assets/images/v1/mocup01.png" alt="" />
              <div className="zubuz-thumb-card">
                <img
                  src="/assets/images/v1/card1.png"
                  alt=""
                  width={294}
                  height={177}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-flex align-items-center">
            <div className="zubuz-default-content">
              <h2>Streamlined developer workflow</h2>
              <p>
                Organize all your client websites in one centralized dashboard.
                Create client accounts, assign URLs, and manage project access
                without the complexity of code storage or server management.
              </p>
              <div className="zubuz-extara-mt">
                <p>
                  <span className="font-semibold">Project Organization:</span> Keep all
                  client websites organized with intuitive project cards and easy
                  URL management for efficient workflow.
                </p>
                <p>
                  <span className="font-semibold">Client Management:</span> Create
                  client accounts instantly, assign specific websites, and maintain
                  secure access control for each project.
                </p>
                <div className="zubuz-extara-mt">
                  <Link className="zubuz-default-btn" to="/service">
                    <span>View All Solutions</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSectionOne;
