import axios from "axios";
import { useEffect, useState } from "react";
import HashLoaderWithText from "../../loaders/HashLoaderWithText";
import StudentGrievanceCard from "./StudentGrievanceCard";

const StudentGrievanceCards = () => {
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/grievance/student").then((res) => {
      setGrievances(res.data.grievances);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container mx-auto pb-5 px-3">
      <h1 className="text-4xl font-extrabold my-5">Grievances Raised by you</h1>
      {loading ? (
        <div className="flex mt-10 pt-10 justify-center">
          <div>
            <HashLoaderWithText
              text="Loading  grievances..."
              textclassName="text-xl m-3"
              size={65}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {grievances.map((grievance) => (
            <StudentGrievanceCard key={grievance._id} grievance={grievance} />
          ))}
        </div>
      )}
    </div>
  );
};
export default StudentGrievanceCards;
