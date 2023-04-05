import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewDeptStaffs = () => {
  const { departmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const [selectedDept, setSelectedDept] = useState({});
  useEffect(() => {
    axios.get("/api/department/" + departmentId).then((res) => {
      setSelectedDept(res.data.department);
      axios
        .get("/api/admin/staffs/view/department/" + departmentId)
        .then((res) => {
          setStaffs(res.data.staffs);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [departmentId]);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Staffs from {selectedDept.name} department</h1>
      {staffs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>More info</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.staffId}</td>
                <td>{staff.name}</td>
                <td>{staff.designation}</td>
                <td>
                  <Link to={`/admin/staffs/details/${staff._id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ViewDeptStaffs;
