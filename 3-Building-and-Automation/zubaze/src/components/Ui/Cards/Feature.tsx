const FeatureCard = ({ title, icon, description }: any) => {
  return (
    <div className="col-xl-4 col-md-6 d-flex">
      <div
        className="zubuz-iconbox-wrap center"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="zubuz-iconbox-icon">
          <img src={icon} alt={title} />
        </div>
        <div className="zubuz-iconbox-data">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
