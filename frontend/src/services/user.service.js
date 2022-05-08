import axios from "axios";
import { headers } from "../constant/header";

const API_URL = "http://localhost:5000/api/user/";

const getCurrentUser = () => {
    return axios.post(API_URL+"getCurrentUser",{},{
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

const getUser = (username) => {
    return axios.post(API_URL+"getUser",{
        username
    })
    .then((response)=>{
        return response.data
    })
}

const followActions = (userId,type) => {
    return axios.post(API_URL+type,{
        userId
    },
    {
        headers:headers()
    }
    )
    .then((response)=>{
        return response.data
    })
}

const exportedObject = {
    getCurrentUser,
    getUser,
    followActions
}

export default exportedObject