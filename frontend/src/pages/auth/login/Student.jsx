import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../../context/AuthContext";

const StudentLogin = () => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ registerNo, password }) => {
    setLoading(true);
    axios
      .post("/api/student/login", { registerNo, password })
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        authDispatch({
          user: res.data.student,
          userType: "student",
          type: "LOGIN",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Student Login</h1>
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

export default StudentLogin;
