import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import moment from "moment";

const StaffAnonGrievanceCard = ({ anonymousGrievance }) => {
  const maxDescriptionLength = 100;
  return (
    <div className="divide-y p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {anonymousGrievance.title}
        </h5>
        <p className="mb-2 text-sm font-medium tracking-tight text-gray-500 dark:text-gray-400">
          Anonymous
        </p>
        <div className="mb-2">
          <div className="text-sm">
            <span className="font-bold">Type:</span>{" "}
            {anonymousGrievance.grievanceType.name} |{" "}
            <span className="font-bold">Status:</span>{" "}
            {anonymousGrievance.grievanceStatus.title}
          </div>
          <div className="text-xs">
            Last updated:{" "}
            {moment(anonymousGrievance.updatedAt).format("h:mm a, DD MMM YY")}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <p className="text-lg mb-3 font-normal text-gray-500 dark:text-gray-400">
          {anonymousGrievance.description.length > maxDescriptionLength
            ? anonymousGrievance.description.substring(
                0,
                maxDescriptionLength
              ) + "..."
            : anonymousGrievance.description}
        </p>
        <Link
          to={"/staff/grievances/view/assigned/" + anonymousGrievance._id}
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <BsInfoCircle className="me-2" />
          More info
        </Link>
      </div>
    </div>
  );
};
export default StaffAnonGrievanceCard;

{
  /* <Link to={`/staff/grievances/view/assigned/${grievance._id}`}>
        <h3>{grievance.title}</h3>
      </Link>
      <p>{grievance.description}</p>
      <p>{grievance.grievanceStatus.title}</p>
      <p>{grievance.grievanceType.name}</p>
      <p>{grievance.student.name}</p> */
}
