import { useContext, useEffect, useState } from "react";
import TokenContext from "../contextStore/token-context";
import { ITokenContext } from "../Interface";
import urlcat from "urlcat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecretPage = () => {
  const [vendor, setVendor] = useState({});
  const [projects, setProjects] = useState();
  const navigatetoLogin = useNavigate();

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI0ODc2NTc5Nzk2NGEyNjk5NjhmZTgiLCJ1c2VybmFtZSI6ImNsb2NsbyIsImlhdCI6MTY2MzQwODE4NCwiZXhwIjoxNjYzNDA5OTg0fQ.xcW6Tf8b0paHmEhz8d5o85cRfk3we3GbJDIZym-GzA0"
  const { token } = useContext<ITokenContext>(TokenContext);

  const SERVER = import.meta.env.VITE_SERVER;
  const vendorUrl = urlcat(SERVER, "vendors/verify");
  const projectUrl = urlcat(SERVER, "projects");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("vendor", vendor);
  console.log("projects", projects);

  useEffect(() => {
    // Verify Vendor
    axios
      .post(vendorUrl, {}, config)
      .then((res) => setVendor(res.data))
      .then((res) => {
        // Get Projects
        axios
          .get(projectUrl, config)
          .then((res) => setProjects(res.data))
          .catch((error) => console.log({ Error: error.response.data.error }));
      })
      .catch((error) => {
        console.log({ Error: error.response.data.error });
        navigatetoLogin("/vendor/login");
      });
  }, []);

  return (
    <>
      <h1>Secret</h1>
    </>
  );
};

export default SecretPage;
