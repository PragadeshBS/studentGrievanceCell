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
import StudentProfile from "./pages/student/Profile";
import StaffProfile from "./pages/staff/Profile";
import CreateAnonymousGrievance from "./pages/anonymous/grievances/Create";
import ViewAnonymousGrievanceDetails from "./pages/staff/grievances/ViewAnonymousGrievanceDetails";
import AdminProtect from "./pages/admin/AdminProtect";
import ViewGrievancesAdmin from "./pages/admin/grievances/ViewGrievances";
import ViewDeptStaffs from "./pages/admin/staff/ViewDeptStaffs";
import ViewStaffs from "./pages/admin/staff/ViewStaffs";
import ViewStaffDetails from "./pages/admin/staff/ViewStaffDetails";
import ApproveStaffs from "./pages/admin/staff/ApproveStaffs";
import "./index.css";
import AuthProtect from "./pages/auth/AuthProtect";

// react tool-tip css
import "react-tooltip/dist/react-tooltip.css";
import GetGrievanceId from "./pages/anonymous/grievances/GetGrievanceId";
import TrackAnonymousGrievance from "./pages/anonymous/grievances/TrackAnonymousGrievance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "anonymous",
        children: [
          {
            path: "grievances",
            children: [
              {
                path: "create",
                element: <CreateAnonymousGrievance />,
              },
              {
                path: "track",
                element: <GetGrievanceId />,
              },
              {
                path: "track/:trackingId",
                element: <TrackAnonymousGrievance />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthProtect />,
        children: [
          {
            path: "login",
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
            path: "register",
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
            path: "profile",
            element: <StudentProfile />,
          },
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
            path: "profile",
            element: <StaffProfile />,
          },
          {
            path: "grievances",
            children: [
              { path: "view/assigned", element: <ViewAssignedGrievances /> },
              {
                path: "view/assigned/:grievanceId",
                element: <ViewGrievanceDetailsStaff />,
              },
              {
                path: "view/assigned/anonymous/:grievanceId",
                element: <ViewAnonymousGrievanceDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        element: <AdminProtect />,
        children: [
          {
            path: "staffs",
            children: [
              {
                path: "approve",
                element: <ApproveStaffs />,
              },
              {
                path: "details/:staffId",
                element: <ViewStaffDetails />,
              },
              {
                path: "view",
                element: <ViewStaffs />,
                children: [
                  {
                    path: "department/:departmentId",
                    element: <ViewDeptStaffs />,
                  },
                ],
              },
            ],
          },
          {
            path: "grievances",
            children: [
              {
                path: "view/all",
                element: <ViewGrievancesAdmin />,
              },
              {
                path: "view/:grievanceId",
                element: <ViewGrievanceDetailsStaff />,
              },
              {
                path: "view/anonymous/:grievanceId",
                element: <ViewAnonymousGrievanceDetails />,
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
