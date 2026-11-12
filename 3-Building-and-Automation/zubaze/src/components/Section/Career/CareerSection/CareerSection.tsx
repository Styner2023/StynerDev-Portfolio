  
import career_data from "../../../../db/career-data";
import CareerCard from "../../../Ui/Cards/CareerCard"; 

const CareerSection = () => {
 

  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Join our team to shape the future</h2>
          <p>
            We're not hiring right now — these roles aren't open for applications.
            Feel free to look around, and check back later for open positions.
          </p>
        </div>
        <div className="zubuz-jobs-wrap">
          {career_data.map((job, index) => (
            <CareerCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerSection;
