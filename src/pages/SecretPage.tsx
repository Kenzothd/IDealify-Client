import { useContext } from "react"
import TokenContext from "../contextStore/token-context"
import { ITokenContext } from "../Interface"


const parseJwt = (token: String) => {
    if (token === "") {
        return {};
    }
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
};

const SecretPage = () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI0ODc2NTc5Nzk2NGEyNjk5NjhmZTgiLCJ1c2VybmFtZSI6ImNsb2NsbyIsImlhdCI6MTY2MzM4NTczOCwiZXhwIjoxNjYzMzg3NTM4fQ.xHdM6sVXRyBKYKKYKhquqYX-vQkipsbdti_VeeN0jVo"

    console.log(parseJwt(token))

    return (
        <h1>secret</h1>
    )
}


export default SecretPage