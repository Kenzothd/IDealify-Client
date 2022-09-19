import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PrivateRoutes from "./utilities/PrivateRoutes";

import VendorAccount from "./components/vendor/VendorAccount";
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";
import Activity from "./components/activity/Activity";
import VendorCreateProject from "./components/vendor/VendorCreateProject";

import VendorLogIn from "./pages/VendorLogIn";
import TokenProvider from "./contextStore/TokenProvider";
import SecretPage from "./pages/SecretPage";
import VendorProjectTracker from "./components/vendor/VendorProjectTracker";
import VendorProjectTable from "./components/vendor/VendorProjectTable";
import VendorCreateProduct from "./components/vendor/VendorCreateProject";
import VendorAddActivity from "./components/vendor/VendorAddActivity";
import LandingPage from "./pages/LandingPage";
import ClientLogIn from "./pages/ClientLogIn";
import VendorDashboard from "./pages/VendorDashboard";
import LoginRedirect from "./pages/LoginRedirect";

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          {/* for all */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/login-redirecr" element={<LandingPage />} />
          {/* client */}
          <Route path="/client/sign-up" element={<ClientSignUp />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />

          {/* vendor */}
          <Route path="/vendor/sign-up" element={<VendorSignUp />} />
          <Route path="/vendor/login" element={<VendorLogIn />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/vendor/:vendorid/create-project"
              element={<VendorCreateProduct />}
            />
            <Route
              path="/vendor/:vendorid/account"
              element={<VendorAccount />}
            />
            <Route
              path="/vendor/:vendorid/dashboard"
              element={<VendorDashboard />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid"
              element={<VendorProjectTable />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid/add-activity"
              element={<VendorAddActivity />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid/activity/:activityid"
              element={<Activity />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
