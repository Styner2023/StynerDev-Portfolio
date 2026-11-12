 
const ContentSection = () => {
  return (
    <div className="section zubuz-section-padding2">
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
              <h2>Our Mission: Organize Website Access</h2>
              <p>
                We believe managing client websites should be simple, not complex.
                Zubaze removes the chaos and gives everyone—developers and clients—
                the organized workspace they deserve.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-icon none-bg">
                    <img src="/assets/images/about/icon1.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data data-small">
                    <span>No Code Storage, Maximum Security:</span>
                    <p>
                      Your code stays on your servers where it belongs. Zubaze only
                      manages access links and dashboards, keeping your intellectual
                      property secure and private.
                    </p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-icon none-bg">
                    <img src="/assets/images/about/icon2.png" alt="" />
                  </div>
                  <div className="zubuz-iconbox-data data-small">
                    <span>Built for Developers & Clients:</span>
                    <p>
                      Developers get powerful organization tools. Clients get clean,
                      simple dashboards. Everyone wins with streamlined website
                      access and management.
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

export default ContentSection;
