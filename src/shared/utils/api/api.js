import Axios from "axios";
import { apiUrl } from "../../constants";

const headers = {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
};

const Api = Axios.create({
    baseURL : apiUrl,
    headers: headers
});

const setAuthHeader = token => {
    Axios.defaults.headers.common["Authorization"] = token;
}

export {
    setAuthHeader
}


export default Api;