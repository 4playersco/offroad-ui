import { Link } from "react-router-dom";

const RecentCheckIns = () => {
  return (
    <div>
      <h3>Recent Check-Ins</h3>
      <ul>
        <li>Date: Lorem Ipsum</li>
        <li>Date: Lorem Ipsum</li>
        <li>Date: Lorem Ipsum</li>
      </ul>
      <Link to="/">
        <small>See All</small>
      </Link>
    </div>
  );
};

export default RecentCheckIns;
