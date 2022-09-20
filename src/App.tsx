import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./utilities/PrivateRoute";

import VendorAccount from "./components/vendor/VendorAccount";
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";
import Activity from "./components/activity/Activity";
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
import VendorUpdateProject from "./components/vendor/VendorUpdateProject";

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          {/* for all */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />

          {/* client */}
          <Route path="/client/sign-up" element={<ClientSignUp />} />

          {/* vendor */}
          <Route path="/vendor/sign-up" element={<VendorSignUp />} />
          <Route path="/vendor/login" element={<VendorLogIn />} />

          <Route
            path="/vendor/:vendorid/create-project"
            element={<PrivateRoute outlet={<VendorCreateProduct />} />}
          />
          <Route
            path="/vendor/:vendorid/update-project"
            element={<PrivateRoute outlet={<VendorUpdateProject />} />}
          />
          <Route
            path="/vendor/:vendorid/account"
            element={<PrivateRoute outlet={<VendorAccount />} />}
          />
          <Route
            path="/vendor/:vendorid/dashboard"
            element={<PrivateRoute outlet={<VendorDashboard />} />}
          />
          <Route
            path="/vendor/:vendorid/projects/:projectid"
            element={<PrivateRoute outlet={<VendorProjectTable />} />}
          />
          <Route
            path="/vendor/:vendorid/projects/:projectid/add-activity"
            element={<PrivateRoute outlet={<VendorAddActivity />} />}
          />
          <Route
            path="/vendor/:vendorid/projects/:projectid/activity/:activityid"
            element={<PrivateRoute outlet={<Activity />} />}
          />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
