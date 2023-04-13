import { useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  useEffect(() => {
    axios
      .get("/api/student/profile")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Profile</div>;
};
export default StudentProfile;