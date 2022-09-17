import React from "react";
import { ITokenContext } from "../Interface";




const TokenContext = React.createContext<ITokenContext | null>(null)

export default TokenContext