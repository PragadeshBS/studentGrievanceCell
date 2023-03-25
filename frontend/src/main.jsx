import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import StaffLogin from "./pages/auth/login/Staff";
import StudentLogin from "./pages/auth/login/Student";
import SubmitGrievance from "./pages/grievance/SubmitGrievance";
import ViewGrievance from "./pages/grievance/ViewGrievance";
import ErrorPage from "./pages/Error";
import StaffRegister from "./pages/auth/register/Staff";
import StudentRegister from "./pages/auth/register/Student";
import HomePage from "./pages/Home";
import Logout from "./pages/auth/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "auth/login/",
        children: [
          {
            path: "staff",
            element: <StaffLogin />,
          },
          {
            path: "student",
            element: <StudentLogin />,
          },
        ],
      },
      {
        path: "auth/register/",
        children: [
          {
            path: "staff",
            element: <StaffRegister />,
          },
          {
            path: "student",
            element: <StudentRegister />,
          },
        ],
      },
      {
        path: "auth/logout",
        element: <Logout />,
      },
      {
        path: "/grievance/create",
        element: <SubmitGrievance />,
      },
      {
        path: "/grievance",
        element: <ViewGrievance />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
