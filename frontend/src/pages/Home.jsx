import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const auth = useAuth();
  useEffect(() => {
    console.log("Auth state changed", auth);
  }, [auth]);
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
            Hello {auth.user.name}, you logged in as a {auth.userType}
          </div>
        )}
      </div>
      <div>
        <Link to="/auth/login/staff">Staff Login</Link>
      </div>
      <div>
        <Link to="/auth/login/Student">Student Login</Link>
      </div>
      <div>
        <Link to="/auth/register/staff">Staff Register</Link>
      </div>
      <div>
        <Link to="/auth/register/student">Student Register</Link>
      </div>
      <div>
        <Link to="/u/grievance/create">Submit Grievance</Link>
      </div>
      <div>
        <Link to="/auth/logout">Logout</Link>
      </div>
    </div>
  );
};
export default HomePage;
