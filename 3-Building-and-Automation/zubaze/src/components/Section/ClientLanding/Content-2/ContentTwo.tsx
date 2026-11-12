import '../client-sections.css';

const ContentSectionTwo = () => {
  return (
    <div className="section zubuz-section-padding2 dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 order-lg-2">
            <div className="zubuz-v3-thumb2">
              <img src="/assets/images/v3/thumb-v3-3.png" alt="" />
              <div className="zubuz-v3-card2">
                <img src="/assets/images/v3/card-v3-5.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="zubuz-default-content m-right light">
              <h2>How It Works - Simple in 3 Steps</h2>
              <div className="zubuz-extara-mt">
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-number">1</div>
                  <div className="zubuz-iconbox-data data-small light">
                    <span>Get your invite:</span>
                    <p>
                      Your developer creates your private dashboard and sends you an
                      invite link. Sign up free or log in — it takes seconds.
                    </p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-number">2</div>
                  <div className="zubuz-iconbox-data data-small light">
                    <span>Open your website:</span>
                    <p>
                      Click your site's thumbnail to open it — your live site and
                      its editor, with no extra logins to chase.
                    </p>
                  </div>
                </div>
                <div className="zubuz-iconbox-wrap-left mw-100">
                  <div className="zubuz-iconbox-number">3</div>
                  <div className="zubuz-iconbox-data data-small light">
                    <span>Edit it yourself:</span>
                    <p>
                      Update your own text, images, and videos anytime. Your developer
                      keeps everything current behind the scenes.
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
