import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/vendor/create-project"
            element={<VendorCreateProduct />}
          />
          <Route path="/vendor/projects" element={<VendorProjectTracker />} />
          <Route
            path="/vendor/projects/:projectid"
            element={<VendorProjectTable />}
          />
          <Route path="/client/sign-up" element={<ClientSignUp />} />
          <Route path="/vendor/sign-up" element={<VendorSignUp />} />
          <Route path="/vendor/login" element={<VendorLogIn />} />
          <Route path="/vendor/account" element={<VendorAccount />} />
          <Route path="/vendor/secret" element={<SecretPage />} />
          <Route
            path="/vendor/projects/:projectid/add-activity"
            element={<VendorAddActivity />}
          />
          <Route
            path="/vendor/projects/:projectid/activity/:activityid"
            element={<Activity />}
          />
          <Route
            path="/vendor/projects/:projectid/activity/:activityid"
            element={<Activity />}
          />

        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
