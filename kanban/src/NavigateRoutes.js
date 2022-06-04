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
import RequireAuth from "./components/Auth/RequireAuth";
import Unauthorized from "./components/Auth/Unauthorized";
import AdminLoginPage from "./pages/AuthPages/Admin/AdminLoginPage";
//User pages
import UserStartPage from "./pages/UserPages/UserStartPage";
import WorkspacePage from "./pages/UserPages/WorkspacePage";
import BoardPage from "./pages/UserPages/BoardsPage";
import GroupPage from "./pages/UserPages/GroupPage";
import CalendarPage from "./pages/UserPages/CalendarPage";
import MessagePage from "./pages/UserPages/MessagePage";
import SettingsPage from "./pages/UserPages/SettingsPage";
import UserProfilePage from "./pages/UserPages/UserProfilePage";
import TemplateBoardPage from "./pages/UserPages/Template/TemplateBoardPage"

//Admin pages
import DashboardPage from "./pages/AdminPages/DashboardPage";
import UserListPage from "./pages/AdminPages/UserListPage";

//Outlet
import Layout from "./components/Layout";

//Email pages
import ChangeEmailPage from "./pages/EmailPages/ChangeEmailPage"
import ConfirmEmailPage from "./pages/EmailPages/ConfirmEmailPage"
import ForgotPasswordPage from "./pages/EmailPages/ForgotPasswordPage"

// 404
import NotFoundPage from "./pages/404Pages/NotFoundPage";

const ROLES = {
  'User': "User",
  'Admin': "Admin",
  'Superuser' : "Superuser"
}


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
          <Route path="/adminlogin" element={<AdminLoginPage />} />

          {/* Protected routes */}
          {/* User pages */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            {" "}
            {/* redirect to login page if not login */}
            <Route path="/userstart" element={<UserStartPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/templateboard" element={<TemplateBoardPage />} />
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
      </Routes>
    </Router>
  );
};

export default NavigateRoutes;
