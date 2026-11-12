const IntegrationCard = ({ icon, name, category, description }: any) => {
  return (
    <div className="col-xl-4 col-md-6">
      <div className="zubuz-iconbox-wrap-left d-block iconbox-left-border">
        <div className="zubuz-iconbox-header">
          <div className="zubuz-iconbox-icon">
            <img src={icon} alt="" />
          </div>
          <div className="zubuz-iconbox-header-data">
            <h4>{name}</h4>
            <p>{category}</p>
          </div>
        </div>
        <div className="zubuz-iconbox-data">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;
