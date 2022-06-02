import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Front page
import HomePage from "./pages/FrontPages/HomePage";
import PrivacyPolicyPage from "./pages/FrontPages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/FrontPages/TermsAndConditionsPage";
import ContactFormPage from "./pages/FrontPages/ContactFormPage";
import LearnMorePage from "./pages/FrontPages/LearnMorePage";
//Auth pages

//User pages
import UserStartPage from "./pages/UserPages/UserStartPage";
import WorkspacePage from "./pages/UserPages/WorkspacePage";
import BoardPage from "./pages/UserPages/BoardsPage";
import GroupPage from "./pages/UserPages/GroupPage";
import CalendarPage from "./pages/UserPages/CalendarPage";
import MessagePage from "./pages/UserPages/MessagePage";
import SettingsPage from "./pages/UserPages/SettingsPage";
import UserProfilePage from "./pages/UserPages/UserProfilePage";

//Admin pages
import AdminDashboardPage from "./pages/AdminPages/AdminDashboardPage"

//Email pages
import ChangeEmailPage from "./pages/EmailPages/ChangeEmailPage"
import ConfirmEmailPage from "./pages/EmailPages/ConfirmEmailPage"
import ForgotPasswordPage from "./pages/EmailPages/ForgotPasswordPage"

// 404
import NotFoundPage from "./pages/404Pages/NotFoundPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import LoginPage from "./pages/AuthPages/LoginPage";


const NavigateRoutes = () => {
  return (
    <Router>
      {/* Router v6 */}
      <Routes>
        {/* Front pages */}
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/learnmore" element={<LearnMorePage />} />

        {/* Auth pages */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User pages */}
        <Route path="/userstart" element={<UserStartPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* Eamil */}
        <Route path="changeemail" element={<ChangeEmailPage />}/>
        <Route path="confirmemail"element={<ConfirmEmailPage />}/>
        <Route path="forgotpassword" element={<ForgotPasswordPage />}/>
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default NavigateRoutes;
