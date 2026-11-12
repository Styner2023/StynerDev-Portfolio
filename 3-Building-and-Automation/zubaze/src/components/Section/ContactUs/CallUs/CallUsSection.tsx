const CallUsSection = () => {
  return (
    <div className="section dark-bg zubuz-section-padding6">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <a href="tel:+13412192601">
              <div className="zubuz-iconbox-wrap-left text-center-lg rt-mb-24">
                <div className="zubuz-iconbox-icon">
                  <img src="/assets/images/icon/call2.svg" />
                </div>
                <div className="zubuz-iconbox-data light">
                  <h3>Call us directly</h3>
                  <p>
                    (341) 219-2601
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6">
            <a href="mailto:contact@zubaze.com">
              <div className="zubuz-iconbox-wrap-left text-center-lg rt-mb-24">
                <div className="zubuz-iconbox-icon">
                  <img src="/assets/images/icon/email3.svg" />
                </div>
                <div className="zubuz-iconbox-data light">
                  <h3>Email us</h3>
                  <p>contact@zubaze.com</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="zubuz-iconbox-wrap-left text-center-lg rt-mb-24">
              <div className="zubuz-iconbox-icon">
                <img src="/assets/images/icon/map2.svg" />
              </div>
              <div className="zubuz-iconbox-data light">
                <h3>Our office address</h3>
                <p>
                  San Francisco,
                  <br /> California
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallUsSection;
