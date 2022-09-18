import React, { FC, useContext, useEffect, useState } from "react";
import { ITokenContext } from "../Interface";
import TokenContext from "./token-context";

const TokenProvider = ({ children }: any) => {
  const [vendorToken, setVendorToken] = useState<String>('');

  const setToken = (data: String) => {
    setVendorToken(data);
  };

  const tokenContext: ITokenContext = {
    token: vendorToken,
    setTokenState: setToken,
  };

  console.log("token received in context: ", tokenContext.token);

  return (
    <TokenContext.Provider value={tokenContext}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
