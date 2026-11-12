import { Link } from "react-router-dom";
import '../client-sections.css';

const ContentSection = () => {
  return (
    <div className="section zubuz-section-padding5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="zubuz-v3-thumb">
              <img src="/assets/images/v3/thumb-v3-2.png" alt="" />
              <div className="zubuz-v3-card">
                <img src="/assets/images/v3/card-v3-4.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="zubuz-default-content m-left">
              <h2>Click Your Site. Update It Yourself.</h2>
              <p>
                Your website lives in one private dashboard your developer set up
                for you. No links to find, no passwords to remember — log in and
                you're ready to make changes.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-icon none-bg">
                    <img src="/assets/images/v3/icon11.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data data-small">
                    <span>Click your website's thumbnail:</span>
                    <p>
                      Each site shows as a thumbnail with its name and status.
                      Click it to open your website and edit the text, images, and videos yourself.
                    </p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-icon none-bg">
                    <img src="/assets/images/v3/icon10.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data data-small">
                    <span>Set up by your developer:</span>
                    <p>
                      Your developer builds your site and adds it here. You get an invite link,
                      sign up free or log in, and it's waiting for you — ready to edit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="zubuz-extara-mt">
                <Link className="zubuz-default-btn" to="/client-sign-up">
                  <span>Get Your Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
