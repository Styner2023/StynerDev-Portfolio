import team_data from "../../../../db/team-data"; 
import TeamCard from "../../../Ui/Cards/Team";

 

const TeamSection = () => {
 

  return (
    <div className="section zubuz-section-padding3">
      <div className="container">
        <div className="zubuz-section-title zubuz-two-column-title">
          <div className="row">
            <div className="col-lg-6">
              <h2>We’ve a team of creatives</h2>
            </div>
            <div className="col-lg-5 offset-lg-1 d-flex align-items-center">
              <p>
                Our team consists of a group of talents. We solve customer
                problems with sincerity. All of our team members are very
                intelligent and skilled.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {team_data.map((team, index) => (
            <TeamCard
              key={index}
              name={team?.name}
              role={team?.role}
              image={team?.image}
              twitter={team?.social?.twitter}
              facebook={team?.social?.facebook}
              linkedin={team?.social?.linkedin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
