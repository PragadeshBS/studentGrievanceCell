import { useEffect } from "react";
import axios from "axios";

const StaffProfile = () => {
  useEffect(() => {
    axios
      .get("/api/staff/profile")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Profile</div>;
};
export default StaffProfile;
