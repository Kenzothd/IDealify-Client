import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VendorSignUp from "./pages/VendorSignUp";
import ClientSignUp from "./pages/ClientSignUp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/client/sign-up' element={<ClientSignUp />} />
        <Route path='/vendor/sign-up' element={<VendorSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
