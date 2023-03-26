import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import StaffLogin from "./pages/auth/login/Staff";
import StudentLogin from "./pages/auth/login/Student";
import SubmitGrievance from "./pages/student/grievance/SubmitGrievance";
import ErrorPage from "./pages/Error";
import StaffRegister from "./pages/auth/register/Staff";
import StudentRegister from "./pages/auth/register/Student";
import HomePage from "./pages/Home";
import Logout from "./pages/auth/Logout";
import StudentProtect from "./pages/student/StudentProtect";
import ViewGrievances from "./pages/student/grievance/ViewGrievances";
import StaffProtect from "./pages/staff/StaffProtect";
import ViewAssignedGrievances from "./pages/staff/grievances/ViewAssigned";
import ViewGrievanceDetailsStaff from "./pages/staff/grievances/ViewGrievanceDetails";
import ViewGrievanceDetailsStudent from "./pages/student/grievance/ViewGrievanceDetails";

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
        // parent route for all protected routes of students
        path: "student",
        element: <StudentProtect />,
        children: [
          {
            path: "grievances",
            children: [
              { path: "view", element: <ViewGrievances /> },
              {
                path: "view/:grievanceId",
                element: <ViewGrievanceDetailsStudent />,
              },
              { path: "create", element: <SubmitGrievance /> },
            ],
          },
        ],
      },
      {
        // parent route for all protected routes of staff
        path: "staff",
        element: <StaffProtect />,
        children: [
          {
            path: "grievances",
            children: [
              { path: "view/assigned", element: <ViewAssignedGrievances /> },
              {
                path: "view/assigned/:grievanceId",
                element: <ViewGrievanceDetailsStaff />,
              },
            ],
          },
        ],
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
