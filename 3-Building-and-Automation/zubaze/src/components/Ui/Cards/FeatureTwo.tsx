const FeatureCardTwo = ({ title, description, image, icon } : any) => {
  return (
    <div
      className="zubuz-iconbox-wrap2"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div className="zubuz-iconbox-icon">
        <img src={icon} alt="" />
      </div>
      <div className="zubuz-iconbox-data" style={{ flexGrow: 1 }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="zubuz-iconbox-thumb" style={{ marginTop: "auto" }}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default FeatureCardTwo;
