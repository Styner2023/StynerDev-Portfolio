import "./Content.css";

const ContentSectionTwo = () => {
  return (
    <div className="section zubuz-section-padding5 white-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 order-lg-2">
            <div className="zubuz-thumb thumb-pl">
              <img src="/assets/images/v1/mocup2.png" alt="" />
              <div className="zubuz-thumb-card2">
                <img
                  src="/assets/images/v1/card2.png"
                  alt=""
                  width={294}
                  height={131}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-flex align-items-center">
            <div className="zubuz-default-content">
              <h2>Secure client dashboard access</h2>
              <p>
                Clients receive personalized dashboards with organized access to
                all their websites. One-click access to live sites and CMS editing
                interfaces without complex logins or confusion.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-iconbox-wrap-left">
                  <div className="zubuz-iconbox-icon">
                    <img src="/assets/images/v1/icon1.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data">
                    <span>Smart Website Cards</span>
                    <p>
                      Auto-fetched site thumbnails with inline edit and delete
                      controls, plus direct links to live sites and CMS panels.
                    </p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left">
                  <div className="zubuz-iconbox-icon">
                    <img src="/assets/images/v1/icon2.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data">
                    <span>Direct CMS Access</span>
                    <p>
                      Click any website card to go directly to your CMS or
                      editing interface - no additional logins required.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSectionTwo;
