import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";

type Quote = {
  title: string;
  body: string;
  name: string;
  role: string;
  avatar: string;
};

const quotes: Quote[] = [
  {
    title: "I update my own site now — no more waiting",
    body: "I used to email my developer for every little text change. Now I log in, click my site, and edit it myself in a couple of minutes.",
    name: "Naomi Bennett",
    role: "Café Owner",
    avatar: "/assets/images/v1/t_user5.png",
  },
  {
    title: "Everything's finally in one place",
    body: "All my websites are right there when I log in — no links to dig up, no passwords to hunt for. I just click and I'm in.",
    name: "Marcus Reed",
    role: "Photographer",
    avatar: "/assets/images/v1/t_user3.png",
  },
  {
    title: "I'm not technical, and it just works",
    body: "I was nervous about touching my own site, but changing my photos, text, and videos is genuinely simple. Nothing to install, nothing to learn.",
    name: "Arjun Nair",
    role: "Studio Owner",
    avatar: "/assets/images/v1/t_user4.png",
  },
];

const ClientTestimonialSection = () => {
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
    <div className="zubuz-testimonial-slider-section zubuz-client-testimonial zubuz-section-padding2">
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
                  <img src={q.avatar} alt="" />
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

export default ClientTestimonialSection;
