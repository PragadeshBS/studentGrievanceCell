import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {!auth.isAuthenticated && "Not Authenticated"}
        {auth.isAuthenticated && (
          <div>
            Hello {auth.user.name}, you are logged in as a {auth.userType}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
