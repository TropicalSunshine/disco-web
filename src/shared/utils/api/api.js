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

const setAuthToken = token => {
    Api.defaults.headers.common["Authorization"] = token;
}

export {
    setAuthToken
}


export default Api;