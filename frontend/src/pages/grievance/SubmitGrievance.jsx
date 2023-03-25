import axios from "axios";
import { useEffect } from "react";

const SubmitGrievance = () => {
  useEffect(() => {
    axios.get("/api/dev/test").then((res) => {
      console.log(res.data);
    });
  }, []);
  return <div>SubmitGrievance</div>;
};
export default SubmitGrievance;
