import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StaffLogin from "./pages/auth/StaffLogin";
import StudentLogin from "./pages/auth/StudentLogin";
import SubmitGrievance from "./pages/grievance/SubmitGrievance";
import ViewGrievance from "./pages/grievance/ViewGrievance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login/staff",
    element: <StaffLogin />,
  },
  {
    path: "/login/student",
    element: <StudentLogin />,
  },
  {
    path: "/grievance/submit",
    element: <SubmitGrievance />,
  },
  {
    path: "/grievance",
    element: <ViewGrievance />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
