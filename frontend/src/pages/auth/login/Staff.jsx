import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useAuth, useAuthDispatch } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const authDispatch = useAuthDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ staffId, password }) => {
    setLoading(true);
    axios
      .post("/api/staff/login", { staffId, password })
      .then((res) => {
        console.log(res.data.data);
        authDispatch({
          user: res.data.data,
          userType: "staff",
          type: "LOGIN",
        });
        setErrorMsg("");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Staff Login</h1>
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
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <p role="alert">{errors.password?.message}</p>}
        </div>
        {errorMsg && <div>{errorMsg}</div>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default StaffLogin;
