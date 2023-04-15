import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DangerAlert from "../../../components/alerts/DangerAlert";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";
import InfoAlert from "../../../components/alerts/InfoAlert";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import DangerButton from "../../../components/buttons/DangerButton";
import moment from "moment";

const TrackAnonymousGrievance = () => {
  const commentRef = useRef();
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (commentRef.current)
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
  }, [comments]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!trackingId) return setError("Tracking ID is required");
    setError("");
    setLoading(true);
    axios
      .get(`/api/anonymousGrievance/${trackingId}`)
      .then((res) => {
        setGrievance(res.data.grievance);
        axios
          .get("/api/comment/anonymous/" + res.data.grievance._id)
          .then((res) => {
            commentRef.current.scrollTop = commentRef.current.scrollHeight;
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
    setAddingComment(true);
    axios
      .post("/api/comment/anonymous/" + grievance._id, {
        comment: getValues("comment"),
      })
      .then((res) => {
        setComments([...comments, res.data.comment]);
        setAddingComment(false);
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
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        {!grievance ? (
          <div>
            <h1 className="text-4xl font-extrabold my-5 text-center">
              Track Anonymous Grievance
            </h1>
            <form>
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
              {error && <DangerAlert alertContent={error} />}
              <div className="mb-6">
                {loading ? (
                  <ClipLoaderWithText text={"Finding your grievance..."} />
                ) : (
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onSubmit}
                  >
                    Track
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-3">
            <div className="mb-4 text-4xl">{grievance.title}</div>
            <div className="mb-6">
              <span className="font-bold">Tracking ID: </span>
              {grievance.trackingId}
            </div>
            <div className="mb-4">
              <span className="font-bold">Created: </span>
              {moment(grievance.createdAt).format("h:mm a, DD/MM/YYYY")}
            </div>
            <div className="mb-4">
              <span className="font-bold">Description: </span>
              {grievance.description}
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div>
                <span className="font-bold">Status: </span>
                {grievance.grievanceStatus.title}
              </div>
              <div
                data-tooltip-content={grievance.grievanceStatus.description}
                data-tooltip-id="status-tooltip"
                data-tooltip-place="bottom"
              >
                <BsInfoCircle />
                <Tooltip id="status-tooltip" />
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold">Category: </span>
              {grievance.grievanceType.name}
            </div>
            {/* comment section begin */}
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
              <div className="mb-4">
                <span className="font-bold">Comments</span>
              </div>
              {comments.length === 0 && (
                <div className="mb-4">No comments yet</div>
              )}
              <div className="max-h-96 overflow-scroll mb-3" ref={commentRef}>
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className={`my-2 p-2 ${
                      comment.authorType === "anonymous"
                        ? "flex justify-end text-right"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`border rounded p-2 divide-y divide-slate-500 dark:divide-slate-50 
                      ${
                        comment.authorType === "anonymous"
                          ? "bg-purple-300 dark:bg-purple-600"
                          : "bg-gray-100 dark:bg-slate-700"
                      }`}
                    >
                      <div className="text-xs">
                        {comment.authorType === "anonymous"
                          ? "Anonymous"
                          : comment.authorType === "admin"
                          ? "Admin"
                          : grievance.staffAssigned.name}
                        ,{" "}
                        {moment(comment.createdAt).format(
                          "h:mm a DD MMMM YYYY   "
                        )}
                      </div>
                      <div>{comment.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
              {grievance.grievanceStatus.title !== "Closed" && (
                <form>
                  <div className="mb-6">
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Add any information you think is relevant"
                      {...register("comment", {
                        required: "A comment is required",
                      })}
                    />
                  </div>
                  {errors.comment && <p>{errors.comment.message}</p>}
                  <InfoAlert alertContent="Your comments will be anonymous and visible to the admin and the staff assigned to your grievance" />
                  <div className="mb-6">
                    <PrimaryButton
                      type="button"
                      onClick={addComment}
                      disabled={addingComment}
                    >
                      Add Comment
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>
            {/* comment section end */}
            <div className="mb-4">
              {grievance.grievanceStatus.title === "Resolved" && (
                <DangerButton onClick={() => modifyStatus("Reopened")}>
                  Reopen grievance
                </DangerButton>
              )}
              {grievance.grievanceStatus.title !== "Resolved" &&
                grievance.grievanceStatus.title !== "Closed" && (
                  <DangerButton onClick={() => modifyStatus("Closed")}>
                    Close grievance
                  </DangerButton>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrackAnonymousGrievance;
