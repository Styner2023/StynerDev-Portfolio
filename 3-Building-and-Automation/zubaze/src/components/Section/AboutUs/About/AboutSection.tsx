 
const AboutSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-7">
              <h2>Simplifying Developer-Client Collaboration</h2>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <p>
                Born from the need to organize client website access without complexity.
                Zubaze helps developers manage projects cleanly and gives clients
                simple, organized access to their websites.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6">
            <div className="zubuz-about-thumb">
              <img
                src="/assets/images/v1/mocup01.png"
                alt="Zubaze overview screen with managed sites count and growth metrics"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="zubuz-about-thumb">
              <img
                src="/assets/images/v1/hero-mocup1.png"
                alt="Zubaze dashboard listing 24 managed client websites with recent activity"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="zubuz-about-thumb">
              <img
                src="/assets/images/v1/mocup2.png"
                alt="Zubaze profile with client accounts, website access, and payment links"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
