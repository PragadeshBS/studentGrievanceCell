import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../../context/AuthContext";
import ClipLoaderWithText from "../../../components/loaders/ClipLoaderWithText";

const StaffRegister = () => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
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
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        authDispatch({
          user: res.data.staff,
          userType: "staff",
          type: "LOGIN",
        });
        navigate("/");
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
        setDepartments(res.data.departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex-grow max-w-3xl px-3">
        <h1 className="text-4xl font-extrabold my-5 text-center">
          Staff Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Staff ID</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.staffId ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Staff ID"
              {...register("staffId", {
                required: "Staff ID is required",
                minLength: {
                  value: 3,
                  message: "Staff ID must be at least 3 characters",
                },
              })}
            />
            {errors.staffId && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.staffId?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Name</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.name ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Department</label>
            <select
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.department ? " border-red-500 dark:border-red-500" : "")
              }
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
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.department?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Designation
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.designation
                  ? " border-red-500 dark:border-red-500"
                  : "")
              }
              placeholder="Designation"
              {...register("designation", {
                required: "Designation is required",
              })}
            />
            {errors.designation && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.designation?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Email</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.email ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">Phone</label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.phone ? " border-red-500 dark:border-red-500" : "")
              }
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is required",
              })}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.phone?.message}
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
              placeholder="Password"
              type="password"
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
          <div className="mb-6">
            <label className="block mb-2 text-xl font-medium">
              Confirm Password
            </label>
            <input
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                (errors.confirmPassword
                  ? " border-red-500 dark:border-red-500"
                  : "")
              }
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          {errorMsg && <div>{errorMsg}</div>}
          <div className="mb-6">
            {loading ? (
              <ClipLoaderWithText text="Registering..." />
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffRegister;
