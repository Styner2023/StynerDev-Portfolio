import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Quote = {
  title: string;
  body: string;
  name: string;
  role: string;
};

const quotes: Quote[] = [
  {
    title: "Cut my client handoff time in half",
    body: "Before Zubaze I was emailing clients spreadsheets of CMS logins and live URLs. Now every client gets their own dashboard with everything in one place — and I never had to host their code.",
    name: "Jonas Aly",
    role: "Freelance Web Developer",
  },
  {
    title: "My clients actually understand what they're paying for",
    body: "The client dashboard makes the work visible. They can see every site we've built, click through to live versions, and find their CMS without asking us. Support tickets dropped almost overnight.",
    name: "Mark Bures",
    role: "Agency Owner",
  },
  {
    title: "Made our studio feel ten times more professional",
    body: "Branded client dashboards changed how clients see us. It's the small thing that makes them feel like they're working with a real studio, not a freelancer juggling Notion pages. Worth every cent.",
    name: "Andrew Chan",
    role: "Studio Director",
  },
];

const TestimonialSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div
      className="zubuz-testimonial-slider-section zubuz-section-padding2"
      style={{ backgroundImage: "url(/assets/images/v2/t-bg.png)" }}
    >
      <div className="container">
        <Slider {...settings} className="zubuz-testimonial-slider">
          {quotes.map((q) => (
            <div className="zubuz-testimonial-slider-item" key={q.name}>
              <div className="zubuz-testimonial-slider-data">
                <div className="zubuz-testimonial-slider-rating">
                  <ul>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i}>
                        <img src="/assets/images/v2/rating2.png" alt="" />
                      </li>
                    ))}
                  </ul>
                </div>
                <h3>"{q.title}"</h3>
                <p>{q.body}</p>
              </div>
              <div className="zubuz-testimonial-slider-author">
                <div className="zubuz-testimonial-slider-author-thumb">
                  <img src="/assets/images/v2/t-user.png" alt="" />
                </div>
                <div className="zubuz-testimonial-slider-author-data">
                  <span>{q.name}</span>
                  <p>{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSection;
