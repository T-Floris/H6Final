import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Front page
import HomePage from "./pages/FrontPages/HomePage";
import PrivacyPolicyPage from "./pages/FrontPages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/FrontPages/TermsAndConditionsPage";
import ContactFormPage from "./pages/FrontPages/ContactFormPage";
import LearnMorePage from "./pages/FrontPages/LearnMorePage";
//Auth pages
import RegisterPage from "./pages/AuthPages/User/RegisterPage";
import LoginPage from "./pages/AuthPages/User/LoginPage";
import ForgotPasswordPage from "./pages/AuthPages/User/ForgotPasswordPage";
import AdminLoginPage from "./pages/AuthPages/Admin/AdminLoginPage";
import RequireAuth from "./components/Auth/RequireAuth";
import Unauthorized from "./components/Auth/Unauthorized";
import PersistLogin from "./components/Auth/PersistLogin";
//User pages
import UserStartPage from "./pages/UserPages/UserStartPage";
import WorkspacePage from "./pages/UserPages/WorkspacePage";
import BoardsPage from "./pages/UserPages/BoardsPage";
import GroupPage from "./pages/UserPages/GroupPage";
import CalendarPage from "./pages/UserPages/CalendarPage";
import MessagePage from "./pages/UserPages/MessagePage";
import SettingsPage from "./pages/UserPages/SettingsPage";
import UserProfilePage from "./pages/UserPages/UserProfilePage";

//Admin pages
import DashboardPage from "./pages/AdminPages/DashboardPage";
import UserListPage from "./pages/AdminPages/UserListPage";

//Outlet
import Layout from "./components/Layout";

//Email pages
import ChangeEmailPage from "./pages/EmailPages/ChangeEmailPage";
import ConfirmEmailPage from "./pages/EmailPages/ConfirmEmailPage";
import ChangePasswordPage from "./pages/EmailPages/ChangePasswordPage";

// 404
import NotFoundPage from "./pages/404Pages/NotFoundPage";
import BoardPage from "./pages/UserPages/BoardPage";

const ROLES = {
  User: "User",
  Admin: "Admin",
  Superuser: "Superuser",
};

const NavigateRoutes = () => {
  return (
    <Router>
      {/* Router v6 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          {/* Front pages */}
          <Route index element={<HomePage />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/learnmore" element={<LearnMorePage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* Auth pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/adminlogin" element={<AdminLoginPage />} />

          {/* Email */}
          <Route path="/changeemail" element={<ChangeEmailPage />} />
          <Route path="/confirmemail" element={<ConfirmEmailPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />

          {/* Protected routes */}
          {/* User pages */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              {" "}
              {/* redirect to login page if not login */}
              <Route path="/userstart" element={<UserStartPage />} />
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:id" element={<BoardPage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/userprofile" element={<UserProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              {/* Admin pages */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/userlist" element={<UserListPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default NavigateRoutes;
