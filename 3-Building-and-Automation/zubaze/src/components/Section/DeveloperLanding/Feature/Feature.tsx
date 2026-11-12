import FeatureCardTwo from "../../../Ui/Cards/FeatureTwo";

type Feature = {
  icon: string;
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    icon: "/assets/images/v2/icon-v2-1.png",
    title: "One dashboard for every client URL",
    description:
      "Add live sites, staging links, CMS panels, and admin logins — all organized per client. No spreadsheets, no scattered Notion docs.",
    image: "/assets/images/v2/card-v2-1.png",
  },
  {
    icon: "/assets/images/v2/icon-v2-2.png",
    title: "Custom-branded client portals",
    description:
      "Give each client their own dashboard at a custom URL. White-label it with your logo, colors, and domain — clients see your studio, not Zubaze.",
    image: "/assets/images/v2/card-v2-2.png",
  },
  {
    icon: "/assets/images/v2/icon-v2-3.png",
    title: "Role-based secure access",
    description:
      "Send one-click invites with scoped permissions. Each client sees only their own sites — clients never bump into each other.",
    image: "/assets/images/v2/card-v2-3.png",
  },
  {
    icon: "/assets/images/v2/icon-v2-4.png",
    title: "Zero code storage, by design",
    description:
      "Zubaze stores links, not files. Your code stays on GitHub, Netlify, Vercel, or your own server. We just keep everything findable.",
    image: "/assets/images/v2/card-v2-4.png",
  },
];

const FeatureSection = () => {
  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title center">
          <h2>Everything you need to manage client websites</h2>
        </div>
        <div className="row">
          {features.map((feature) => (
            <div className="col-lg-6 d-flex" key={feature.title}>
              <FeatureCardTwo
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
