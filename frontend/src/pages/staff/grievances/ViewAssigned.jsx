import axios from "axios";
import { useEffect } from "react";

const ViewAssignedGrievances = () => {
  useEffect(() => {
    axios.get("/api/grievance/staff").then((res) => {
      console.log(res.data);
    });
  }, []);
  return <div>view</div>;
};
export default ViewAssignedGrievances;
