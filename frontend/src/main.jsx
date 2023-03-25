import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StaffLogin from "./pages/auth/login/Staff";
import StudentLogin from "./pages/auth/login/Student";
import SubmitGrievance from "./pages/grievance/SubmitGrievance";
import ViewGrievance from "./pages/grievance/ViewGrievance";
import ErrorPage from "./pages/Error";
import StaffRegister from "./pages/auth/register/Staff";
import StudentRegister from "./pages/auth/register/Student";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/login/staff",
        element: <StaffLogin />,
      },
      {
        path: "/auth/login/student",
        element: <StudentLogin />,
      },
      {
        path: "/auth/register/staff",
        element: <StaffRegister />,
      },
      {
        path: "/auth/register/student",
        element: <StudentRegister />,
      },
      {
        path: "/grievance/submit",
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
