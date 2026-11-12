 
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const ContentSectionOne = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("zubuz-counter");
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="section zubuz-section-padding2">
      <div id="zubuz-counter"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="zubuz-v2-thumb thumb-mr">
              <img src="/assets/images/v2/thumb-v2-1.png" alt="" />
              <div className="zubuz-v2-thumb-shape">
                <img src="/assets/images/v2/shape3-v2.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="zubuz-default-content">
              <h2>One hub for every client website you've ever built</h2>
              <p>
                Stop juggling spreadsheets, password docs, and "where's my CMS
                link?" emails. Zubaze gives developers a single workspace to
                organize live URLs, admin panels, and client access — without
                ever storing a line of their code.
              </p>
              <div className="zubuz-extara-mt">
                <div className="zubuz-counter-wrap">
                  <div className="zubuz-counter-data">
                    <h2 className="zubuz-counter-number">
                      <span className="zubuz-counter">
                        {isVisible ? <CountUp end={0} duration={2} /> : 0}
                      </span>
                    </h2>
                    <p>Lines of client code stored</p>
                  </div>
                  <div className="zubuz-counter-data">
                    <h2 className="zubuz-counter-number">
                      &lt;{" "}
                      <span className="zubuz-counter">
                        {isVisible ? <CountUp end={10} duration={3} /> : 10}
                      </span>
                      min
                    </h2>
                    <p>To onboard a new client</p>
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

export default ContentSectionOne;
