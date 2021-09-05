
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

const post = async (endpoint, body) => {
    checkPassedEndpoint(endpoint);
    const reqPath = baseReqPath + endpoint;
    try {
        const res = await axios({
            method: 'post',
            url: reqPath,
            data: body,
            headers: {
                'Content-Type': 'application/json'
            } 
        });
        return res;
    }catch(err){
        return {
            status: err.response.status, 
            errRes: err.response.data
        }
    }
}

export {
    get, 
    post
}