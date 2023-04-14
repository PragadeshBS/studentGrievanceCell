import { Outlet } from "react-router-dom";
import { useAuthDispatch } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        authDispatch({
          type: "LOGIN",
          userType: res.data.user.userType,
          user: res.data.user.userInfo,
        });
        setLoading(false);
      })
      .catch(() => {
        authDispatch({ type: "LOGOUT" });
        setLoading(false);
      });
  }, []);
  return (
    <div className="App min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header />
        <main>{loading ? <div>Loading...</div> : <Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
