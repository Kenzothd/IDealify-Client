import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VendorAccount from "./components/vendor/VendorAccount";
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";
import Activity from "./components/activity/Activity";
import VendorProjectsPage from "./pages/VendorProjectsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vendor/projects" element={<VendorProjectsPage />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/client/sign-up" element={<ClientSignUp />} />
        <Route path="/vendor/sign-up" element={<VendorSignUp />} />
        <Route path="/vendor/account" element={<VendorAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
