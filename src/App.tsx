import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VendorAccount from "./components/vendor/VendorAccount";
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";
import Activity from "./components/activity/Activity";
import VendorProjectsPage from "./pages/VendorProjectsPage";
import VendorLogIn from "./pages/VendorLogIn";
import TokenProvider from "./contextStore/TokenProvider";
import SecretPage from "./pages/SecretPage";
import VendorProjectTracker from "./components/vendor/VendorProjectTracker";

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/vendor/projects" element={<VendorProjectsPage />} />
          <Route
            path="/vendor/projects/tracker"
            element={<VendorProjectTracker />}
          />
          <Route path="/activity/:id" element={<Activity />} />
          <Route path="/client/sign-up" element={<ClientSignUp />} />
          <Route path="/vendor/sign-up" element={<VendorSignUp />} />
          <Route path="/vendor/login" element={<VendorLogIn />} />
          <Route path="/vendor/account" element={<VendorAccount />} />
          <Route path="/vendor/secret" element={<SecretPage />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
