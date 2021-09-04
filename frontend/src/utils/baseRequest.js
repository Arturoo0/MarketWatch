
import axios from 'axios';

const get = async (endpoint) => {
    if (endpoint === undefined){
        throw 'No endpoint provided in get(endpoint: string) call';
    }
    const baseReqPath = `http://localhost:3000${endpoint}`
    console.log(baseReqPath);
}

const post = async (endpoint) => {
    console.log(endpoint);
}

export {
    get, 
    post
}