import axios from 'axios';
import {BASE_URL, JWT} from "./constants";

const customAxios = axios.create({
    baseURL: BASE_URL
})

customAxios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const status = error.response?.status;
    const errorCode = error.response?.code;

    if (errorCode === "ERR_NETWORK") {
        // @ts-ignore
        window.location.href = window.location.protocol + "//" + window.location.host + "/login"
    }

    console.log("=== status ===", status);
    if (!status || status === 401) {
        console.log("=== Error ===", error);
        console.log("=== Status ===", status);
        console.log("=== Status ===", errorCode);
        localStorage.removeItem(JWT);
        // // @ts-ignore
        window.location.href = window.location.protocol + "//" + window.location.host + "/login"
    } else {
        console.log("error", error)
        return Promise.reject(error); // Delegate error to calling side
    }
});

const getJwtToken = () => {
    return localStorage.getItem(JWT) || "";
}

export const getReq = (url: string) => {
    return customAxios.get(url, {
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Access-Control-Allow-Origin': "*"
        }
    })
}

export const postReq = (url: string, body: object) => {
    return customAxios.post(url, body, {
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Access-Control-Allow-Origin': "*"
        }
    })
}

export const loginReq = (url: string, body?: object) => {
    return customAxios.post(url, body)
}

export const deleteReq = (url: string) => {
    return customAxios.delete(url,{
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Access-Control-Allow-Origin': "*"
        }
    })
}

export const putReq = (url: string, body?: object) => {
    // TODO - fix this CORS error ffs
    return customAxios.put(url, body,{
        headers: {
            Authorization: `Bearer ${getJwtToken()}`,
            'Access-Control-Allow-Origin': "*"
        }
    })
}


