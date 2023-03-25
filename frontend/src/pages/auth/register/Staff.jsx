import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const StaffRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (staffDetails) => {
    if (staffDetails.password !== staffDetails.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    axios
      .post("/api/staff/register", staffDetails)
      .then(() => {
        setErrorMsg("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };
  //   retrieve the list of departments on page load
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
      <h1>Staff Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Staff ID"
            {...register("staffId", {
              required: "Staff ID is required",
              minLength: {
                value: 3,
                message: "Staff ID must be at least 3 characters",
              },
            })}
          />
          {errors.staffId && <p role="alert">{errors.staffId?.message}</p>}
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
          <select {...register("department")}>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            placeholder="Designation"
            {...register("designation", {
              required: "Designation is required",
            })}
          />
          {errors.designation && (
            <p role="alert">{errors.designation?.message}</p>
          )}
        </div>
        <div>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
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
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
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
            })}
          />
          {errors.confirmPassword && (
            <p role="alert">{errors.confirmPassword?.message}</p>
          )}
        </div>
        {errorMsg && <div>{errorMsg}</div>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffRegister;
