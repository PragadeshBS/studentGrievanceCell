import axios from "axios";
import { useEffect, useState } from "react";
import StaffGrievanceCard from "./StaffGrievanceCard";
import HashLoaderWithText from "../../loaders/HashLoaderWithText";

const GrievanceCards = ({ userType }) => {
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  const [anonymousGrievances, setAnonymousGrievances] = useState([]);
  const regularGrievancesApi =
    userType === "admin"
      ? "/api/admin/grievances/view"
      : "/api/grievance/staff";
  const anonymousGrievancesApi =
    userType === "admin"
      ? "/api/admin/anonymous-grievances/view"
      : "/api/grievance/staff/anonymous";
  useEffect(() => {
    axios.get(regularGrievancesApi).then((res) => {
      setGrievances(res.data.grievances);
      axios.get(anonymousGrievancesApi).then((res) => {
        setLoading(false);
        setAnonymousGrievances(res.data.grievances);
      });
    });
  }, []);
  return (
    <div className="container mx-auto pb-5 px-3">
      <h1 className="text-4xl font-extrabold my-5">All Grievances</h1>
      {loading ? (
        <div className="flex mt-10 pt-10 justify-center">
          <div>
            <HashLoaderWithText
              text="Loading  grievances..."
              textClass="text-xl m-3"
              size={65}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl mb-2">Regular Grievances</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {grievances.map((grievance) => (
              <StaffGrievanceCard
                grievance={grievance}
                key={grievance._id}
                userType={userType}
              />
            ))}
          </div>
          <h1 className="text-2xl mt-5 mb-2">Anonymous Grievances</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {anonymousGrievances.map((grievance) => (
              <StaffGrievanceCard
                grievance={grievance}
                key={grievance._id}
                userType={userType}
                isAnonymousGrievance={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default GrievanceCards;
