import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useAuthDispatch } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const authDispatch = useAuthDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    setLoading(true);
    axios
      .post("/api/admin/login", { email, password })
      .then((res) => {
        authDispatch({
          user: res.data.admin,
          userType: "admin",
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
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 3,
                message: "Email must be at least 3 characters",
              },
            })}
          />
          {errors.email && <p role="alert">{errors.email?.message}</p>}
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
export default AdminLogin;
