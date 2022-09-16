import { Typography } from "@mui/material";
import React, { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
const Activity :FC  = ()=>{
    const {id} = useParams();

  return <>
  <Typography> Single Activity Will Show Here</Typography>
  <Typography> {id}</Typography>

  </>
}

export default Activity;