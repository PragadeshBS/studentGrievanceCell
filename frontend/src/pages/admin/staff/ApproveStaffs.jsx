import axios from "axios";
import { useEffect, useState } from "react";

const ApproveStaffs = () => {
  const [unapprovedStaffs, setUnapprovedStaffs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/staffs/view/unapproved")
      .then((res) => {
        setUnapprovedStaffs(res.data.staffs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleApprove = (staffId) => {
    axios
      .put("/api/admin/staffs/approve/" + staffId)
      .then((res) => {
        setUnapprovedStaffs(
          unapprovedStaffs.filter((staff) => staff._id !== staffId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Approve Staffs</h1>
      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unapprovedStaffs.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.staffId}</td>
              <td>{staff.name}</td>
              <td>{staff.designation}</td>
              <td>{staff.department.name}</td>
              <td>
                <button onClick={() => handleApprove(staff._id)}>
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ApproveStaffs;
