import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewStaffDetails = () => {
  const { staffId } = useParams();
  useEffect(() => {
    axios
      .get("/api/admin/staffs/view/details/" + staffId)
      .then((res) => {
        console.log(res.data.staff);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>ViewStaffDetails</div>;
};
export default ViewStaffDetails;
