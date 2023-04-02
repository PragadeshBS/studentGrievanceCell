import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateAnonymousGrievance = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [grievanceTypes, setGrievanceTypes] = useState([]);
  const [deptStaffs, setDeptStaffs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("/api/anonymousGrievance", data)
      .then((res) => {
        setTrackingId(res.data.grievance.trackingId);
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
    axios.get("/api/department").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);
  const updateStaffs = (e) => {
    setSelectedDept(e.target.value);
    axios.get(`/api/staff/department/${e.target.value}`).then((res) => {
      setDeptStaffs(res.data.staffs);
    });
  };
  return (
    <div>
      <h1>Raise a new anonymous grievance</h1>
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
          <select onChange={updateStaffs}>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.department && <p role="alert">Department is required</p>}
        </div>
        {selectedDept && (
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
        )}
        <div>{errorMsg && <p role="alert">{errorMsg}</p>}</div>
        <div>
          <button type="submit">Raise Grievance</button>
        </div>
      </form>
      {trackingId && (
        <div>
          <p>Your grievance has been raised successfully</p>
          <p>Tracking ID: {trackingId}</p>
          <div>
            You can track the status of your grievance using the tracking ID.
            <p>
              Make a note of the tracking ID before closing this page. It will
              not be displayed again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateAnonymousGrievance;
