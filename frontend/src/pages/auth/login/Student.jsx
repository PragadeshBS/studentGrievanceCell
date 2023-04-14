import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        <h1 className="text-4xl font-extrabold my-5 text-center">
          Student Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Register No.
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.registerNo ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="2020504032"
              {...register("registerNo", {
                required: "Register No. is required",
                minLength: {
                  value: 3,
                  message: "Register No. must be at least 3 characters",
                },
              })}
            />
            {errors.registerNo && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.registerNo?.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Password</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.password ? " border-red-500 dark:border-red-500" : "")
              }
              type="password"
              placeholder="•••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          {errorMsg && (
            <div
              class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">{errorMsg}</span>
              </div>
            </div>
          )}
          <div className="mb-6">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <small>
          Don't have an account yet?{" "}
          <span className="text-blue-600 dark:text-blue-500 hover:underline">
            <Link to="/auth/register/student">Register</Link>
          </span>
        </small>
      </div>
    </div>
  );
};

export default StudentLogin;
