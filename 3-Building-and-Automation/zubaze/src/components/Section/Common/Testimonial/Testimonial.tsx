import { Link } from "react-router-dom";
import testimonial_datas from "../../../../db/testimonial-data";
import TestimonialCard from "../../../Ui/Cards/Testimonial";


const TestimonialSection = ({ button = "true" }) => {


  return (
    <div className="section zubuz-section-padding2 light-bg">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Loved by developers and clients worldwide</h2>
        </div>
        <div className="row">
          {testimonial_datas?.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              title={testimonial?.title}
              description={testimonial?.description}
              avatar={testimonial?.author?.avatar}
              name={testimonial?.author?.name}
              role={testimonial?.author?.role}
            />
          ))}
        </div>
        {button === "true" && (
          <div className="zubuz-testimonial-btn">
            <Link className="zubuz-default-btn" to="/testimonials">
              <span>View All Reviews</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSection;
