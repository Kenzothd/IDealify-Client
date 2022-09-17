import React, { FC } from "react";
import VendorCreateProject from "../components/vendor/VendorCreateProject";
import VendorProjectTable from "../components/vendor/VendorProjectTable";

const VendorProjectsPage: FC = () => {
  return (
    <>
      <VendorCreateProject />
      <VendorProjectTable />
    </>
  );
};

export default VendorProjectsPage;
