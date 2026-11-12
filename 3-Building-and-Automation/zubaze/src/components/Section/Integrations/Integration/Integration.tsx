  
import IntegrationCard from "../../../Ui/Cards/Integration";
import platform_datas from "../../../../db/platform-data";

const IntegrationSection = () => {
 

  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center w-large">
          <h2>Built to connect with your favorite tools</h2>
        </div>
        <div className="row">
          {platform_datas?.map((platform, index) => (
            <IntegrationCard
              key={index}
              icon={platform?.icon}
              name={platform?.name}
              category={platform?.category}
              description={platform?.description}
              link={platform?.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationSection;
