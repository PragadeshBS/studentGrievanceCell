import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

const SubmitGrievance = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [deptStaffs, setDeptStaffs] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("/api/grievance", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMsg(err.response.data.message);
      });
  };
  useEffect(() => {
    axios.get("/api/grievance/types").then((res) => {
      setGrievanceTypes(res.data.grievanceTypes);
    });
    axios.get("/api/staff").then((res) => {
      setDeptStaffs(res.data.staffs);
    });
  }, []);
  return (
    <div>
      <h1>Raise a new grievance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Grievance Title"
            {...register("title", {
              required: "Grievance title is required",
            })}
          />
          {errors.title && <p role="alert">{errors.title?.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="Grievance Description"
            {...register("description", {
              required: "Grievance description is required",
            })}
          />
          {errors.description && (
            <p role="alert">{errors.description?.message}</p>
          )}
        </div>
        <div>
          <select {...register("grievanceType", { required: true })}>
            <option value="">Select Grievance Type</option>
            {grievanceTypes.map((grievanceType) => (
              <option key={grievanceType._id} value={grievanceType._id}>
                {grievanceType.name}
              </option>
            ))}
          </select>
          {errors.grievanceType && (
            <p role="alert">Grievance type is required</p>
          )}
        </div>
        <div>
          <select {...register("staffAssigned", { required: true })}>
            <option value="">Select Staff</option>
            {deptStaffs.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name} ({staff.designation})
              </option>
            ))}
          </select>
          {errors.staffAssigned && <p role="alert">Staff is required</p>}
        </div>
        <div>{errorMsg && <p role="alert">{errorMsg}</p>}</div>
        <div>
          <button type="submit">Raise Grievance</button>
        </div>
      </form>
    </div>
  );
};
export default SubmitGrievance;
