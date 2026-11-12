import service_data from "../../../../db/service-data";
import SerciveCard from "../../../Ui/Cards/Sercive";
 

const ServiceSection = () => {
 
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-7">
              <h2>Solutions for developers and their clients</h2>
            </div>
            <div className="col-lg-5 d-flex align-items-center">
              <p>
                From organized client dashboards to white-label branding and
                secure access, Zubaze brings everything you need to manage
                client websites into one clean platform.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {service_data?.map((service, index) => (
            <SerciveCard
              key={index}
              title={service?.title}
              icon={service?.icon}
              description={service?.description}
              link={service?.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
