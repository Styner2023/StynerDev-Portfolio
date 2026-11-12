import Marquee from "react-fast-marquee";
import "./Brand.css";

type Customer = {
  name: string;
  domain: string;
  href: string;
};

const customers: Customer[] = [
  { name: "Watani Stiner", domain: "watanistiner.com", href: "https://www.watanistiner.com/" },
  { name: "Francisco Herrera Music", domain: "franciscoherreramusic.com", href: "https://franciscoherreramusic.com" },
  { name: "Ecotones SLS", domain: "ecotonesls.com", href: "https://ecotonesls.com" },
  { name: "Abejas Sin Fronteras", domain: "abejas-sin-fronteras.com", href: "https://abejas-sin-fronteras.com" },
  { name: "Earthy Organics", domain: "earthyorganics.com", href: "https://earthyorganics.com" },
  { name: "Bonis Rubatosis", domain: "bonisrubatosis.com", href: "https://bonisrubatosis.com" },
  { name: "Miraniwell", domain: "miraniwell.com", href: "https://miraniwell.com" },
  { name: "Suriname OnSite", domain: "surinameonsite.com", href: "https://www.surinameonsite.com" },
];

const faviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const CustomerCard = ({ customer }: { customer: Customer }) => (
  <a
    className="zubuz-brand-pill-dark"
    href={customer.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={faviconUrl(customer.domain)} alt="" width={28} height={28} />
    <span>{customer.name}</span>
  </a>
);

const BrandSection = () => {
  const half = Math.ceil(customers.length / 2);
  const rowOne = customers.slice(0, half);
  const rowTwo = customers.slice(half);

  return (
    <div className="section dark-bg zubuz-section-padding4">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="zubuz-brand-logo-content">
              <h3>
                Trusted by real businesses we proudly serve worldwide
              </h3>
            </div>
          </div>
          <div className="col-lg-7">
            <Marquee speed={30} className="zubuz-brand-slider" pauseOnHover>
              {rowOne.map((c) => (
                <div className="zubuz-brand-item" key={c.domain}>
                  <CustomerCard customer={c} />
                </div>
              ))}
            </Marquee>
            <Marquee
              speed={30}
              direction="right"
              className="zubuz-brand-slider zubuz-brand-slider-row2"
              pauseOnHover
            >
              {rowTwo.map((c) => (
                <div className="zubuz-brand-item" key={c.domain}>
                  <CustomerCard customer={c} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
