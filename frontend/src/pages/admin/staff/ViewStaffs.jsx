import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const ViewStaffs = () => {
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [departments, setDepartments] = useState([]);
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
    <div>
      Choose a dept to view staffs
      <select
        value={selectedDeptId}
        onChange={(e) => {
          setSelectedDeptId(e.target.value);
        }}
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
      <Link to={selectedDeptId !== "" ? `department/${selectedDeptId}` : ""}>
        <button>View staffs</button>
      </Link>
      <Outlet />
    </div>
  );
};
export default ViewStaffs;
