import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/FrontPages/HomePage";
import NotFoundPage from "./pages/404/NotFoundPage";


const NavigateRoutes = () => {
  return (
    <Router>
      {/* Router v6 */}
      <Routes>
        {/* Front pages */}
        <Route index element={<HomePage />} />


        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default NavigateRoutes;
