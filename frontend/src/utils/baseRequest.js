
import axios from 'axios';

const baseReqPath = 'http://localhost:3000';
const checkPassedEndpoint = (endpoint) => {
    if (endpoint === undefined){
        throw 'No endpoint provided in get(endpoint: string) call'; 
    }
}

const get = async (endpoint) => {
    checkPassedEndpoint(endpoint);
    const reqPath = baseReqPath + endpoint;
}

const post = async (endpoint, data) => {
    checkPassedEndpoint(endpoint);
    const reqPath = baseReqPath + endpoint;
    const res = await axios.post(reqPath, data);
    console.log(res);
}

export {
    get, 
    post
}