import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import moment from "moment";

const StaffGrievanceCard = ({ grievance, isAnonymousGrievance }) => {
  const maxDescriptionLength = 100;
  return (
    <div className="divide-y p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {grievance.title}
        </h5>
        <p className="mb-2 text-sm font-medium tracking-tight text-gray-500 dark:text-gray-400">
          {isAnonymousGrievance ? (
            "Anonymous"
          ) : (
            <>
              {grievance.student.name} ({grievance.student.registerNo})
            </>
          )}
        </p>
        <div className="mb-2">
          <div className="text-sm">
            <span className="font-bold">Type:</span>{" "}
            {grievance.grievanceType.name} |{" "}
            <span className="font-bold">Status:</span>{" "}
            {grievance.grievanceStatus.title}
          </div>
          <div className="text-xs">
            Last updated:{" "}
            {moment(grievance.updatedAt).format("h:mm a, DD MMM YY")}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-lg mb-3 font-normal text-gray-500 dark:text-gray-400">
          {grievance.description.length > maxDescriptionLength
            ? grievance.description.substring(0, maxDescriptionLength) + "..."
            : grievance.description}
        </p>
        <Link
          to={
            "/staff/grievances/view/assigned/" +
            (isAnonymousGrievance ? "anonymous/" : "") +
            grievance._id
          }
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <BsInfoCircle className="me-2" />
          More info
        </Link>
      </div>
    </div>
  );
};
export default StaffGrievanceCard;
