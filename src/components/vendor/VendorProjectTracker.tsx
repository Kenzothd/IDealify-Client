import React, { useState, useEffect, FC, useContext } from "react";
import { IProject } from "../../Interface";
import urlcat from "urlcat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import TokenContext from "../../contextStore/token-context";
// import { ITokenContext } from "../../Interface";

const SERVER = import.meta.env.VITE_SERVER;

const VendorProjectTracker: FC = () => {
  const [projects, setProjects] = useState<IProject[]>([
    {
      _id: "",
      vendorID: "",
      clientID: "",
      projectName: "",
      housingType: [""],
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectStatus: [""],
      uploadedFiles: "",
      description: "",
      projectProgress: "",
      // review:{type: mongoose.Schema.Types.ObjectId, ref: "Review" },
      designTheme: [""],
    },
  ]);
  const [vendor, setVendor] = useState({});
  const navigate = useNavigate();

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI0ODc2NTc5Nzk2NGEyNjk5NjhmZTgiLCJ1c2VybmFtZSI6ImNsb2NsbyIsImlhdCI6MTY2MzQwODE4NCwiZXhwIjoxNjYzNDA5OTg0fQ.xcW6Tf8b0paHmEhz8d5o85cRfk3we3GbJDIZym-GzA0"
  //   const { token } = useContext(TokenContext) as ITokenContext;
  const token: any = sessionStorage.getItem("token");

  //   useEffect(() => {
  //     const url = urlcat(
  //       SERVER,
  //       `/projects/id/6326ad9268fde94c3e6438d4` // vendor Project ID used here
  //     );
  //     axios
  //       .get(url)
  //       .then((res) => setProjects([...res.data]))
  //       .catch((err) => console.log(err));
  //   }, []);

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
    axios
      .get(projectUrl, config)
      .then((res) => setProjects(res.data))
      .catch((error) => console.log({ Error: error.response.data.error }));
  }, []);

  const handleProjectView = (e: any) => {
    console.log(e.target.id);
    navigate(`/vendor/projects/${e.target.id}`);
  };

  return (
    <>
      <h1>Projects</h1>
      {projects.map((ele) => (
        <div key={ele._id}>
          <div>
            <p>{ele.projectName}</p>
            <p>{ele.projectStatus}</p>
          </div>
          <button id={ele._id} onClick={handleProjectView}>
            View Project
          </button>
        </div>
      ))}
    </>
  );
};

export default VendorProjectTracker;
