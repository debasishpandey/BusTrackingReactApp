import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
  Routes,
} from "react-router-dom";

import AdminDashboard from "./Component/Admin/AdminDashboard.jsx";
import "leaflet/dist/leaflet.css";
import HomePage from "./Component/Home/HomePage.jsx";
import RoleLogin from "./Component/RoleLogin.jsx";
import StudentDashboard from "./Component/Student/StudentDashboard.jsx";
import AdminLayout from "./Component/Admin/AdminLayout.jsx";
import BusRegister from "./Component/Bus/BusRegister.jsx";
import BusLayout from "./Component/Bus/BusLayout.jsx";
import BusUpdate from "./Component/Bus/BusUpdate.jsx";
import StudentRegister from "./Component/AdminStudent/StudentRegister.jsx";
import AdminStudentLayout from "./Component/AdminStudent/AdminStudentLayout.jsx";
import AdminStudentUpdate from "./Component/AdminStudent/AdminStudentUpdate.jsx";
import AdminDriverLayout from "./Component/AdminDriver/AdminDriverLayout.jsx";
import AdminDriverRegister from "./Component/AdminDriver/AdminDriverRegister.jsx";
import BusList from "./Component/Bus/BusList.jsx";
import StudentList from "./Component/AdminStudent/StudentList.jsx";
import DriverList from "./Component/AdminDriver/DriverList.jsx";
import AdminDriverUpdate from "./Component/AdminDriver/AdminDriverUpdate.jsx";
import DriverLayout from "./Component/Driver/DriverLayout.jsx";
import DriverDashboard from "./Component/Driver/DriverDashboard.jsx";
import RouteManager from "./Component/Route/RouteManager.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

import AdminHeader from "./Component/Admin/AdminHeader.jsx";
import Navbarc from "./Component/Admin/Navbar.jsx";
import ForgotPassword from "./Component/ForgetPassword.jsx";
import ResetPassword from "./Component/ResetPassword.jsx";
import StudentLayout from "./Component/Student/StudentLayout.jsx";
import StudentProfile from "./Component/Student/StudentProfile.jsx";
import DriverProfile from "./Component/Driver/DriverProfile.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route element={<BusLayout />}>
          <Route path="/admin-dashboard/bus/view-all" element={<BusList />} />
          <Route path="/admin-dashboard/bus/add" element={<BusRegister />} />
          <Route
            path="/admin-dashboard/bus/update/:busId"
            element={<BusUpdate />}
          />
        </Route>

        <Route element={<AdminStudentLayout />}>
          <Route
            path="/admin-dashboard/student/view-all"
            element={<StudentList />}
          />
          <Route
            path="/admin-dashboard/student/register"
            element={<StudentRegister />}
          />
          <Route
            path="/admin-dashboard/student/update/:registrationNo"
            element={<AdminStudentUpdate />}
          />
        </Route>

        <Route element={<AdminDriverLayout />}>
          <Route
            path="/admin-dashboard/driver/view-all"
            element={<DriverList />}
          />
          <Route
            path="/admin-dashboard/driver/register"
            element={<AdminDriverRegister />}
          />
          <Route
            path="/admin-dashboard/driver/update/:driverId"
            element={<AdminDriverUpdate />}
          />
        </Route>
      </Route>
      <Route element={<DriverLayout />}>
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/driver-profile" element={<DriverProfile />} />
      </Route>
      <Route element={<StudentLayout />}>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
         <Route path="/student-profile" element={<StudentProfile />} />
      </Route>

      {/* Student and Public Routes */}

      <Route path="/" element={<HomePage />} />
      <Route path="/forgot-password/:role" element={<ForgotPassword />} />
      <Route path="/:role/reset-password" element={<ResetPassword />} />
      <Route path="/admin-Login" element={<RoleLogin role="admin" />} />
      <Route path="/student-Login" element={<RoleLogin role="student" />} />
      <Route path="/driver-Login" element={<RoleLogin role="driver" />} />
      

    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  </StrictMode>
);
