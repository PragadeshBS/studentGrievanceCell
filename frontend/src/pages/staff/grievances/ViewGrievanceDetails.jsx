import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const ViewGrievanceDetailsStaff = () => {
  const [loading, setLoading] = useState(true);
  const [grievance, setGrievance] = useState({});
  const [sentiment, setSentiment] = useState({});
  const [comments, setComments] = useState([]);
  const { grievanceId } = useParams();
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const addComment = () => {
    axios
      .post("/api/comment/" + grievanceId, {
        comment: getValues("comment"),
      })
      .then((res) => {
        setComments([...comments, res.data.comment]);
        reset();
      });
  };
  const modifyStatus = (status) => {
    axios
      .patch("/api/grievance/status/" + grievanceId, {
        grievanceStatus: status,
      })
      .then((res) => {
        setGrievance(res.data.grievance);
      });
  };
  useEffect(() => {
    axios
      .get("/api/grievance/" + grievanceId)
      .then((res) => {
        setGrievance(res.data.grievance);
        setSentiment(res.data.sentiment);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("/api/comment/" + grievanceId).then((res) => {
      setComments(res.data.comments);
    });
  }, []);
  if (loading) return <p>Loading grievance...</p>;
  return (
    <div className="container mx-auto pb-5 px-3">
      <h1>{grievance.title}</h1>
      <p>{grievance.createdAt}</p>
      <p>
        Sentiment:{" "}
        {sentiment.positive > sentiment.negative
          ? "Positive " + sentiment.positive + "%"
          : "Negative " + sentiment.negative + "%"}
      </p>
      <p>{grievance.description}</p>
      <p>Status: {grievance.grievanceStatus.title}</p>
      <p>{grievance.grievanceType.name}</p>
      <p>{grievance.student.name}</p>
      <p>{grievance.student.registerNo}</p>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.comment}</p>
          <p>{comment.createdAt}</p>
          <p>
            {comment.authorType === "staff"
              ? grievance.staffAssigned.name
              : comment.authorType === "admin"
              ? "Admin"
              : grievance.student.name}
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
        {(grievance.grievanceStatus.title === "Assigned" ||
          grievance.grievanceStatus.title === "Reopened") && (
          <button type="button" onClick={() => modifyStatus("In Progress")}>
            Mark as in progress
          </button>
        )}
        {(grievance.grievanceStatus.title === "Assigned" ||
          grievance.grievanceStatus.title == "In Progress" ||
          grievance.grievanceStatus.title === "Reopened") && (
          <button type="button" onClick={() => modifyStatus("Resolved")}>
            Mark as resolved
          </button>
        )}
      </div>
    </div>
  );
};
export default ViewGrievanceDetailsStaff;
