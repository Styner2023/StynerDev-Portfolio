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

const CustomerPill = ({ customer }: { customer: Customer }) => (
  <a
    className="zubuz-brand-pill"
    href={customer.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={faviconUrl(customer.domain)} alt="" width={24} height={24} />
    <span>{customer.name}</span>
  </a>
);

const BrandSection = () => {
  return (
    <div className="zubuz-brand-logo-section">
      <div className="container">
        <div className="zubuz-brand-logo-wrap">
          <p>Trusted by real businesses we proudly serve worldwide</p>
          <Marquee speed={30} className="zubuz-brand-slider3" pauseOnHover>
            {customers.map((c) => (
              <div className="zubuz-brand-item" key={c.domain}>
                <CustomerPill customer={c} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
