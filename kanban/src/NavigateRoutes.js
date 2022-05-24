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
// import UserStartPage from "./pages/UserPages/UserStartPage";

//Admin pages

// 404
import NotFoundPage from "./pages/404/NotFoundPage";

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
        

        {/* User pages */}
        {/* <Route path="/userstart" element={<UserStartPage />} /> */}


        {/* Admin pages */}

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default NavigateRoutes;
