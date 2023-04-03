import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewGrievances = () => {
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  const [anonymousGrievances, setAnonymousGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/admin/grievances/view").then((res) => {
      axios.get("/api/admin/anonymous-grievances/view").then((res) => {
        setLoading(false);
        setAnonymousGrievances(res.data.grievances);
      });
      setGrievances(res.data.grievances);
    });
  }, []);
  return (
    <div>
      <h1>All Grievances</h1>
      {loading && <p>Loading grievances...</p>}
      <ul>
        {grievances.map((grievance) => (
          <li key={grievance._id}>
            <Link to={`/admin/grievances/view/${grievance._id}`}>
              <h3>{grievance.title}</h3>
            </Link>
            <p>{grievance.description}</p>
            <p>{grievance.grievanceStatus.title}</p>
            <p>{grievance.grievanceType.name}</p>
            <p>{grievance.student.name}</p>
            <p>{grievance.staffAssigned.name}</p>
          </li>
        ))}
      </ul>
      <h1>Anonymous Grievances</h1>
      <ul>
        {anonymousGrievances.map((grievance) => (
          <li key={grievance._id}>
            <Link to={`/admin/grievances/view/anonymous/${grievance._id}`}>
              <h3>{grievance.title}</h3>
            </Link>
            <p>{grievance.description}</p>
            <p>{grievance.grievanceStatus.title}</p>
            <p>{grievance.grievanceType.name}</p>
            <p>{grievance.staffAssigned.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ViewGrievances;
