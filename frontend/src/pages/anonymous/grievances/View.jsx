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
    setLoading(true);
    axios
      .get(`/api/anonymousGrievance/${trackingId}`)
      .then((res) => {
        setGrievance(res.data.grievance);
        axios
          .get("/api/comment/" + res.data.grievance._id)
          .then((res) => {
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
    <div>
      {error && <p>{error}</p>}
      {!grievance ? (
        <div>
          <h1>Track Anonymous Grievance</h1>
          <form>
            <div>
              <input
                placeholder="Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button onClick={onSubmit}>Track</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>{grievance.title}</h1>
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
  );
};
export default TrackAnonymousGrievance;
