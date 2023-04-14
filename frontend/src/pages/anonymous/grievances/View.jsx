import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const TrackAnonymousGrievance = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!trackingId) return setError("Tracking ID is required");
    setLoading(true);
    axios
      .get(`/api/anonymousGrievance/${trackingId}`)
      .then((res) => {
        setGrievance(res.data.grievance);
        axios
          .get("/api/comment/anonymous/" + res.data.grievance._id)
          .then((res) => {
            console.log(res.data);
            setComments(res.data.comments);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const addComment = () => {
    axios
      .post("/api/comment/anonymous/" + grievance._id, {
        comment: getValues("comment"),
      })
      .then((res) => {
        setComments([...comments, res.data.comment]);
        reset();
      });
  };
  const modifyStatus = (status) => {
    axios
      .patch("/api/anonymousGrievance/status/" + grievance._id, {
        grievanceStatus: status,
      })
      .then((res) => {
        setGrievance(res.data.grievance);
      });
  };
  if (loading) return <p>Loading grievance...</p>;
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        {!grievance ? (
          <div>
            <h1 className="text-4xl font-extrabold my-5 text-center">
              Track Anonymous Grievance
            </h1>
            <form>
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tracking ID
                  </label>
                  <input
                    placeholder="32F2G7"
                    value={trackingId}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                {error && (
                  <div
                    className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 mb-6"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onSubmit}
                >
                  Track
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1>{grievance.title}</h1>
            <p>Tracking ID: {grievance.trackingId}</p>
            <p>{grievance.description}</p>
            <p>Status: {grievance.grievanceStatus.title}</p>
            <p>{grievance.grievanceType.name}</p>
            <p>Anonymous Grievance</p>
            <h2>Comments</h2>
            {comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.comment}</p>
                <p>{comment.createdAt}</p>
                <p>
                  {comment.authorType === "anonymous"
                    ? "Anonymous"
                    : comment.authorType === "admin"
                    ? "Admin"
                    : grievance.staffAssigned.name}
                </p>
              </div>
            ))}
            {grievance.grievanceStatus.title !== "Closed" && (
              <form>
                <div>
                  <textarea
                    placeholder="comment"
                    {...register("comment", {
                      required: "A comment is required",
                    })}
                  />
                </div>
                {errors.comment && <p>{errors.comment.message}</p>}
                <button type="button" onClick={addComment}>
                  Add comment
                </button>
              </form>
            )}
            <div>
              {grievance.grievanceStatus.title === "Resolved" && (
                <button type="button" onClick={() => modifyStatus("Reopened")}>
                  Reopen grievance
                </button>
              )}
              {grievance.grievanceStatus.title !== "Closed" && (
                <button type="button" onClick={() => modifyStatus("Closed")}>
                  Close grievance
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrackAnonymousGrievance;
