interface Job {
  id?: number;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
}

interface CareerCardProps {
  job: Job;
}

const CareerCard = ({ job }: CareerCardProps) => {
  return (
    <div className="zubuz-jobs-item">
      <div className="zubuz-jobs-item-content">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
      </div>
      <div className="zubuz-jobs-item-content">
        <span>{job.location}</span>
        <span>
          {job.type}, Salary: {job.salary}
        </span>
      </div>
      <div className="zubuz-jobs-item-content">
        <div className="zubuz-jobs-apply-btn">
          <span className="zubuz-default-btn outline-btn">
            <span>Position not open</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
