import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewAssignedGrievances = () => {
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/grievance/staff").then((res) => {
      setLoading(false);
      setGrievances(res.data.grievances);
    });
  }, []);
  return (
    <div>
      <h1>Grievances assigned to you</h1>
      {loading && <p>Loading grievances...</p>}
      <ul>
        {grievances.map((grievance) => (
          <li key={grievance._id}>
            <Link to={`/staff/grievances/view/assigned/${grievance._id}`}>
              <h3>{grievance.title}</h3>
            </Link>
            <p>{grievance.description}</p>
            <p>{grievance.grievanceStatus.title}</p>
            <p>{grievance.grievanceType.name}</p>
            <p>{grievance.student.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ViewAssignedGrievances;
