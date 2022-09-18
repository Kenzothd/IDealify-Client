import React from "react";
import { ITokenContext } from "../Interface";

const TokenContext = React.createContext<ITokenContext>({
  token: "",
  setTokenState: () => { },
});

export default TokenContext;
