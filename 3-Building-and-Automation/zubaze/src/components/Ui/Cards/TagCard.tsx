import { Link } from "react-router-dom";

 
const TagCard = () => {
  return (
    <div className="widget">
      <h3 className="wp-block-heading">Tags:</h3>
      <div className="wp-block-tag-cloud">
        <Link to="">Client Management</Link>
        <Link to="">Developers</Link>
        <Link to="">Dashboards</Link>
        <Link to="">Security</Link>
        <Link to="">Collaboration</Link>
        <Link to="">Workflow</Link>
      </div>
    </div>
  );
};

export default TagCard;
