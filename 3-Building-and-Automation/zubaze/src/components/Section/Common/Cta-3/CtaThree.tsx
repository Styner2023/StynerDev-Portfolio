import { Link } from "react-router-dom";

 

const CtaThree = ({ title, btnText, btnLink = "/contact-us", image, imageAlt = "" }: any) => {
  if (image) {
    return (
      <div className="section zubuz-section-padding2 dark-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="zubuz-default-content cta light">
                <h2>{title}</h2>
                <div className="zubuz-extara-mt">
                  <Link className="zubuz-default-btn" to={btnLink}>
                    <span>{btnText}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="zubuz-cta-thumb">
                <img src={image} alt={imageAlt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section zubuz-section-padding dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="zubuz-default-content cta light">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="col-lg-5 d-flex align-items-center">
            <div className="zubuz-title-btn">
              <Link className="zubuz-default-btn" to={btnLink}>
                <span>{btnText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaThree;
