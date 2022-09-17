COVER OUR ASSES (BACKEND)

# within backend

1. import authenticateToken middleware into Controller file and add it to all routes

# within frontend

2. whenever doing any axios calls, to make sure that config file is passed through with Token

const config = {
headers: {
Authorization: `Bearer ${token}`,
},
};

3. in order to send over token, token must be taken from context

import { useContext } from "react";
import TokenContext from "../contextStore/token-context";
import { ITokenContext } from "../Interface";

const { token } = useContext<ITokenContext>(TokenContext);
