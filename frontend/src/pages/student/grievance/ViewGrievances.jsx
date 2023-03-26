import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/grievance/student").then((res) => {
      setGrievances(res.data.grievances);
      console.log(res.data.grievances);
    });
  }, []);
  return (
    <div>
      <h1>Grievances raised by you</h1>
      <div>
        <ul>
          {grievances.map((grievance) => {
            return (
              <li key={grievance._id}>
                <div>
                  <div>
                    <Link to={`/student/grievances/view/${grievance._id}`}>
                      <span>Subject: </span>
                      <span>{grievance.title}</span>
                    </Link>
                  </div>
                  <div>
                    <span>Category: </span>
                    <span>{grievance.grievanceType.name}</span>
                  </div>

                  <div>
                    <span>Description: </span>
                    <span>{grievance.description}</span>
                  </div>
                  <div>
                    <span>Status: </span>
                    <span>{grievance.grievanceStatus.title}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ViewGrievances;
