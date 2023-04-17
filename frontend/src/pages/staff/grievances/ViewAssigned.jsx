import axios from "axios";
import { useState, useEffect } from "react";
import StaffGrievanceCard from "../../../components/grievance/staff/StaffGrievanceCard";
import StaffAnonGrievanceCard from "../../../components/grievance/staff/StaffAnonGrievanceCard";
import HashLoaderWithText from "../../../components/loaders/HashLoaderWithText";

const ViewAssignedGrievances = () => {
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  const [anonymousGrievances, setAnonymousGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/grievance/staff").then((res) => {
      axios.get("/api/grievance/staff/anonymous").then((res) => {
        setLoading(false);
        setAnonymousGrievances(res.data.grievances);
      });
      setGrievances(res.data.grievances);
    });
  }, []);
  return (
    <div className="container mx-auto pb-5">
      <div className="px-3">
        <h1 className="text-4xl font-extrabold my-5">
          Grievances assigned to you
        </h1>
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
                <StaffGrievanceCard key={grievance._id} grievance={grievance} />
              ))}
            </div>
            <h1 className="text-2xl mt-5 mb-2">Anonymous Grievances</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {anonymousGrievances.map((grievance) => (
                <StaffAnonGrievanceCard
                  key={grievance._id}
                  anonymousGrievance={grievance}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewAssignedGrievances;
