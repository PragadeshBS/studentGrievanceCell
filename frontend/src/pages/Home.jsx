import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() => {
          console.log(auth);
        }}
      >
        Log auth state
      </button>
      <div>
        {!auth.isAuthenticated && "Not Authenticated"}
        {auth.isAuthenticated && (
          <div>
            Hello {auth.user.name}, you are logged in as a {auth.userType}
          </div>
        )}
      </div>
      <h3>Public routes</h3>
      <div>
        <Link to="/anonymous/grievances/create">
          Submit a Grievance (Anonymous)
        </Link>
      </div>
      <div>
        <Link to="/anonymous/grievances/track">
          Track an anonymous Grievance
        </Link>
      </div>
      <div>
        <Link to="/auth/login/staff">Staff Login</Link>
      </div>
      <div>
        <Link to="/auth/login/student">Student Login</Link>
      </div>
      <div>
        <Link to="/auth/register/staff">Staff Register</Link>
      </div>
      <div>
        <Link to="/auth/register/student">Student Register</Link>
      </div>
      <div>
        <Link to="/auth/logout">Logout</Link>
      </div>
      <h3>Student only routes</h3>
      <div>
        <Link to="/student/grievances/create">Submit Grievance</Link>
      </div>
      <div>
        <Link to="/student/grievances/view">View submitted Grievances</Link>
      </div>
      <div>
        <Link to="/student/profile">Profile</Link>
      </div>
      <h3>Staff only routes</h3>
      <div>
        <Link to="/staff/grievances/view/assigned">
          View assigned Grievances
        </Link>
      </div>
      <div>
        <Link to="/staff/profile">Profile</Link>
      </div>
      <h3>Admin only routes</h3>
      <div>
        <Link to="/admin/grievances/view/all">View all Grievances</Link>
      </div>
      <div>
        <Link to="/admin/staffs/view">View Department Staffs</Link>
      </div>
      <div>
        <Link to="/admin/staffs/approve">Approve Registered Staffs</Link>
      </div>
    </div>
  );
};
export default HomePage;
