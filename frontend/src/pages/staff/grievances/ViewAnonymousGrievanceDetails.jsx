import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Description from "../../../components/grievance/anonymous/Description";
import Comments from "../../../components/grievance/anonymous/Comments";
import SuccessButton from "../../../components/buttons/SuccessButton";
import PurpleButton from "../../../components/buttons/PurpleButton";

const ViewAnonymousGrievanceDetails = () => {
  const [loading, setLoading] = useState(true);
  const commentRef = useRef();
  const [grievance, setGrievance] = useState({});
  const [sentiment, setSentiment] = useState({});
  const [comments, setComments] = useState([]);
  const [addingComment, setAddingComment] = useState(false);
  const { grievanceId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addComment = (data) => {
    setAddingComment(true);
    axios
      .post("/api/comment/" + grievanceId, {
        comment: data.comment,
      })
      .then((res) => {
        setComments([...comments, res.data.comment]);
        setAddingComment(false);
        reset();
      });
  };
  const modifyStatus = (status) => {
    axios
      .patch("/api/anonymousGrievance/status/" + grievanceId, {
        grievanceStatus: status,
      })
      .then((res) => {
        setGrievance(res.data.grievance);
      });
  };
  useEffect(() => {
    axios.get("/api/anonymousGrievance/id/" + grievanceId).then((res) => {
      setGrievance(res.data.grievance);
      setSentiment(res.data.sentiment);
      setLoading(false);
    });
    axios.get("/api/comment/" + grievanceId).then((res) => {
      setComments(res.data.comments);
    });
  }, []);
  if (loading) return <p>Loading grievance...</p>;
  return (
    <div className="container mx-auto flex jusitfy-center">
      <div className="flex-grow max-w-5xl px-3">
        <div className="mt-3">
          <Description grievance={grievance} sentiment={sentiment} />
          <Comments
            userType="staff"
            comments={comments}
            grievance={grievance}
            commentRef={commentRef}
            register={register}
            addComment={addComment}
            addingComment={addingComment}
            errors={errors}
            handleSubmit={handleSubmit}
          />
          <div className="mb-4">
            {(grievance.grievanceStatus.title === "Assigned" ||
              grievance.grievanceStatus.title === "Reopened") && (
              <SuccessButton onClick={() => modifyStatus("Resolved")}>
                Mark as in progress
              </SuccessButton>
            )}
            {(grievance.grievanceStatus.title === "Assigned" ||
              grievance.grievanceStatus.title == "In Progress" ||
              grievance.grievanceStatus.title === "Reopened") && (
              <PurpleButton onClick={() => modifyStatus("Resolved")}>
                Mark as resolved
              </PurpleButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewAnonymousGrievanceDetails;
