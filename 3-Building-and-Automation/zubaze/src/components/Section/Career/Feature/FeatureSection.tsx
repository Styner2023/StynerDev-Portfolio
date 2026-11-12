 
import FeatureCardThree from "../../../Ui/Cards/FeatureCardThree"; 
import feature_data2 from "../../../../db/feature-ata2";

const FeatureSection = () => {
 

  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-7">
              <h2>Advantages of working with us</h2>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <p>
                We embrace creativity & continuous improvement, fostering a
                culture of innovation. We believe in the power of teamwork and
                collaboration.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {feature_data2.map((feature, index) => (
            <FeatureCardThree key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
