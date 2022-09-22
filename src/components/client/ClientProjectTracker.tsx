import React, { useState, useEffect, FC, useContext } from "react";
import { IClient, IProject } from "../../Interface";
import urlcat from "urlcat";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import ClientProjectTable from "./ClientProjectTable";

// import TokenContext from "../../contextStore/token-context";
// import { ITokenContext } from "../../Interface";

const SERVER = import.meta.env.VITE_SERVER;

const ClientProjectTracker: FC = () => {
  const navigate = useNavigate();
  const { clientid } = useParams();
  const token: any = sessionStorage.getItem("token");
  const [projects, setProjects] = useState<IProject[]>([
    {
      _id: "",
      vendorId: "",
      clientId: "",
      projectName: "",
      housingType: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectStatus: "",
      uploadedFiles: [""],
      description: "",
      projectProgress: "",
      // review:{type: mongoose.Schema.Types.ObjectId, ref: "Review" },
      designTheme: "",
      totalCosting: undefined,
      comments: "",
    },
  ]);

  const [revampProjects, setRevampProjects] = useState<IProject[]>([]);

  const projectUrl = urlcat(SERVER, "projects");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("projects", projects);
  console.log("Revamp projects", revampProjects);

  //   console.log("token", token);

  useEffect(() => {
    //Fetch Project
    axios
      .get(projectUrl, config)
      .then((res) => {
        setProjects(res.data);
        const projects = res.data;
        console.log(res.data);
        let requests: [] = res.data.map((project: IProject) => {
          const url = urlcat(SERVER, `/vendors/id/${project.vendorId}`);
          return axios.get(url, config);
        });

        //Fetch Vendor Names
        Promise.all(requests)
          .then((res) => {
            let vendorNames = res.map((r: any) => r.data.contactPersonName);
            console.log(vendorNames);
            let newProjects = projects.map((ele: IProject, i: number) => {
              return { ...ele, vendorName: vendorNames[i] };
            });
            setRevampProjects(newProjects);
            console.log(revampProjects);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log({ Error: error.response.data.error }));
  }, []);

  const handleProjectView = (e: any) => {
    console.log(e.target.id);
    navigate(`/client/${clientid}/projects/${e.target.id}`);
  };

  return (
    <>
      <ClientProjectTable revampProjects={revampProjects} />
    </>
  );
};

export default ClientProjectTracker;
