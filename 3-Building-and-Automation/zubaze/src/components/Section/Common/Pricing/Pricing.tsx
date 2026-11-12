import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

type Plan = {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  bullets: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "Try Zubaze with a couple of clients — no card needed.",
    bullets: [
      "Up to 2 clients",
      "3 websites per client",
      "Zubaze-branded dashboard",
      "Standard support",
    ],
  },
  {
    name: "Freelancer",
    monthly: 19,
    annual: 190,
    description: "For solo developers managing a steady book of clients.",
    bullets: [
      "Up to 15 clients",
      "Unlimited websites per client",
      "Custom dashboard URL",
      "CMS & admin link organization",
      "Email support",
    ],
  },
  {
    name: "Agency",
    monthly: 49,
    annual: 490,
    description: "For small teams running 20+ active client websites.",
    bullets: [
      "Up to 50 clients",
      "Unlimited websites per client",
      "White-label branding",
      "Custom domain on dashboards",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Studio",
    monthly: 99,
    annual: 990,
    description: "For established studios with portfolios at scale.",
    bullets: [
      "Unlimited clients",
      "Unlimited websites per client",
      "White-label + custom domain",
      "Dedicated account manager",
      "SSO & advanced security",
    ],
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const togglePrice = () => setIsAnnual((prev) => !prev);

  return (
    <div id="zubuz-pricing" className="section zubuz-section-padding3 zubuz-pricing-section">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Simple pricing that scales with your client list</h2>
        </div>
        <div className="pricing-btn">
          <div className="toggle-btn">
            <label>Monthly </label>
            <input
              className="form-check-input btn-toggle price-deck-trigger"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={isAnnual}
              onChange={togglePrice}
            />
            <label>Annually</label>
          </div>
        </div>
        <div
          className="row zubuz-pricing-four-column"
          id="table-price-value"
          data-pricing-dynamic
          data-value-active={isAnnual ? "annual" : "monthly"}
        >
          {plans.map((plan) => (
            <div className="col-xl-3 col-md-6 d-flex" key={plan.name}>
              <div
                className={`zubuz-pricing-wrap${plan.featured ? " active" : ""}`}
              >
                {plan.featured && (
                  <span className="zubuz-pricing-badge">Most Popular</span>
                )}
                <div className="zubuz-pricing-header">
                  <h5>{plan.name}</h5>
                </div>
                <div className="zubuz-pricing-price">
                  <h2>$</h2>
                  <div className="zubuz-price dynamic-value">
                    {isAnnual ? plan.annual : plan.monthly}
                  </div>
                  <p className="dynamic-value">
                    /{isAnnual ? "Yearly" : "Monthly"}
                  </p>
                </div>
                <div className="zubuz-pricing-description">
                  <p>{plan.description}</p>
                </div>
                <div className="zubuz-pricing-body">
                  <p>{plan.name} plan includes:</p>
                  <ul>
                    {plan.bullets.map((bullet) => (
                      <li key={bullet}>
                        <img src="/assets/images/v3/check.png" alt="" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  className={`zubuz-pricing-btn${plan.featured ? " active" : ""}`}
                  to={plan.monthly === 0 ? "/sign-up" : "/contact-us"}
                >
                  {plan.monthly === 0 ? "Start Free" : "Get Started"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
