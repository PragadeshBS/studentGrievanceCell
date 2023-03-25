import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (studentDetails) => {
    if (studentDetails.password !== studentDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    console.log(studentDetails);
    setErrorMsg("");
    setLoading(true);
    axios
      .post("/api/student/register", studentDetails)
      .then(() => {
        setErrorMsg("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };
  useEffect(() => {
    axios
      .get("/api/department")
      .then((res) => {
        setDepartments(res.data.data.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Student Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Register No."
            {...register("registerNo", {
              required: "Register No. is required",
              minLength: {
                value: 3,
                message: "Register No. must be at least 3 characters",
              },
            })}
          />
          {errors.registerNo && (
            <p role="alert">{errors.registerNo?.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p role="alert">{errors.name?.message}</p>}
        </div>
        <div>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p role="alert">{errors.email?.message}</p>}
        </div>
        <div>
          <input
            placeholder="Phone"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && <p role="alert">{errors.phone?.message}</p>}
        </div>
        <div>
          <select
            {...register("department", {
              required: "Department is required",
            })}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p role="alert">{errors.department?.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p role="alert">{errors.password?.message}</p>}
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Confirm Password must be at least 6 characters",
              },
            })}
          />
          {errors.confirmPassword && (
            <p role="alert">{errors.confirmPassword?.message}</p>
          )}
        </div>
        {errorMsg && <p role="alert">{errorMsg}</p>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;
