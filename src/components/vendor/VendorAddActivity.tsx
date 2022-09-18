import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VendorAddActivity: FC = () => {
  const navigate = useNavigate();
  const { projectid } = useParams();

  const handlerBackToProjTable = () => {
    navigate(`/vendor/projects/${projectid}`);
  };
  return (
    <>
      <h1>Add actvity</h1>
      <button>Submit</button>
      <button onClick={handlerBackToProjTable}>Back to Project Table</button>
    </>
  );
};

export default VendorAddActivity;
