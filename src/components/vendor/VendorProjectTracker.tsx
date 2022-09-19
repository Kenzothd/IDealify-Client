import React, { useState, useEffect, FC, useContext } from "react";
import { IProject } from "../../Interface";
import urlcat from "urlcat";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import TokenContext from "../../contextStore/token-context";
// import { ITokenContext } from "../../Interface";

const SERVER = import.meta.env.VITE_SERVER;

const VendorProjectTracker: FC = () => {
  const navigate = useNavigate();
  const { vendorid } = useParams();

  const token: any = sessionStorage.getItem("token");
  const projectUrl = urlcat(SERVER, "projects");
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

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("projects", projects);

  useEffect(() => {
    axios
      .get(projectUrl, config)
      .then((res) => setProjects(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleProjectView = (e: any) => {
    console.log(e.target.id);
    navigate(`/vendor/${vendorid}/projects/${e.target.id}`);
  };

  return (
    <>
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project._id}>
          <div>
            <p>{project.projectName}</p>
            <p>{project.projectStatus}</p>
          </div>
          <button id={project._id} onClick={handleProjectView}>
            View Project
          </button>
        </div>
      ))}
    </>
  );
};

export default VendorProjectTracker;
