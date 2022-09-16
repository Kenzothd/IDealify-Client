import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VendorProjectTable from "./components/vendor/VendorProjectTable";
import VendorAccount from "./components/vendor/VendorAccount";
import Activity from "./components/activity/Activity";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/vendor/project-tracker" element={<VendorProjectTable/>}/>
      <Route path="/activity/:id" element={<Activity/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;


// EXISTING COMPONENTS CREATED 
{/* <VendorProjectTable /> */}
{/* <VendorAccount /> */}
{/* <Activity/> */}