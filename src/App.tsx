import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./utilities/PrivateRoute";
import VendorAccount from "./components/vendor/VendorAccount";
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";
import VendorLogIn from "./pages/VendorLogIn";
import TokenProvider from "./contextStore/TokenProvider";
import SecretPage from "./pages/SecretPage";
import VendorCreateProduct from "./components/vendor/VendorCreateProject";
import VendorAddActivity from "./components/vendor/VendorAddActivity";
import LandingPage from "./pages/LandingPage";
import ClientLogIn from "./pages/ClientLogIn";
import VendorDashboard from "./pages/VendorDashboard";
import LoginRedirect from "./pages/LoginRedirect";
import VendorUpdateProject from "./components/vendor/VendorUpdateProject";
import VendorTab from "./components/vendor/Vendortab";
import VendorActivityTable from "./components/vendor/VendorActivityTable";
import Testing from "./pages/Testing";
import ClientDashboard from "./pages/ClientDashboard";
import ClientLoginForm from "./components/client/ClientLoginForm";
import ClientTab from "./components/client/Clienttab";
import ClientActivityTable from "./components/client/ClientActivityTable";
import ClientAccount from "./components/client/ClientAccount";
import VendorProfile from "./components/vendor/VendorProfile";
import ClientActivity from "./components/client/ClientActivity";
import VendorActivity from "./components/vendor/VendorActivity";
import NavBar from "./components/UI/NavBar";
import VendorPortfolioForm from "./components/vendor/VendorPortfolioForm";
import PortfolioDetails from "./pages/PortfolioDetails";
import VendorSinglePortfolio from "./pages/VendorSinglePortfolio";
import ClientChangePassword from "./components/client/ClientChangePassword";
import VendorDetails from "./pages/VendorDetails";

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          {/* for all */}

          <Route path="/" element={<NavBar />}>
            <Route index element={<LandingPage />} />
            <Route path="/client/sign-up" element={<ClientSignUp />} />
            <Route path="/client/login" element={<ClientLogIn />} />
            <Route path="/vendor/sign-up" element={<VendorSignUp />} />

            <Route path="/vendor/login" element={<VendorLogIn />} />
            <Route path="/:vendorname" element={<VendorDetails />} />
            <Route
              path="/:vendorname/:portfolioid"
              element={<PortfolioDetails />}
            />
          </Route>

          <Route path="/login-redirect" element={<LoginRedirect />} />

          {/* client */}

          <Route path="/client" element={<ClientTab />}>
            <Route
              path="/client/:clientid/dashboard"
              element={<PrivateRoute outlet={<ClientDashboard />} />}
            />
            <Route
              path="/client/:clientid/projects/:projectid"
              element={<PrivateRoute outlet={<ClientActivityTable />} />}
            />
            <Route
              path="/client/:clientid/account"
              element={<PrivateRoute outlet={<ClientAccount />} />}
            />
            <Route
              path="/client/:clientid/account/changepassword"
              element={<PrivateRoute outlet={<ClientChangePassword />} />}
            />
            <Route
              path="/client/:clientid/projects/:projectid/activity/:activityid"
              element={<PrivateRoute outlet={<ClientActivity />} />}
            />
          </Route>

          {/* vendor */}

          <Route path="/vendor/upload" element={<Testing />} />

          <Route path="/vendor/secret" element={<SecretPage />} />

          <Route path="/vendor" element={<VendorTab />}>
            <Route
              path="/vendor/:vendorid/create-project"
              element={<PrivateRoute outlet={<VendorCreateProduct />} />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid/update-project"
              element={<PrivateRoute outlet={<VendorUpdateProject />} />}
            />
            <Route
              path="/vendor/:vendorid/account"
              element={<PrivateRoute outlet={<VendorAccount />} />}
            />
            <Route
              path="/vendor/:vendorid/profile"
              element={<PrivateRoute outlet={<VendorProfile />} />}
            />
            <Route
              path="/vendor/:vendorid/profile/portfolio/:portfolioid"
              element={<VendorSinglePortfolio />}
            />
            <Route
              path="/vendor/:vendorid/portfolio-form"
              element={<PrivateRoute outlet={<VendorPortfolioForm />} />}
            />
            <Route
              path="/vendor/:vendorid/dashboard"
              element={<PrivateRoute outlet={<VendorDashboard />} />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid"
              element={<PrivateRoute outlet={<VendorActivityTable />} />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid/add-activity"
              element={<PrivateRoute outlet={<VendorAddActivity />} />}
            />
            <Route
              path="/vendor/:vendorid/projects/:projectid/activity/:activityid"
              element={<PrivateRoute outlet={<VendorActivity />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
