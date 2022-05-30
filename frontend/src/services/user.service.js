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
        username,
    })
    .then((response)=>{
        return response.data
    })
}

const followActions = (userId,type,pUserId) => {
    return axios.post(API_URL+type,{
        userId,
        pUserId
    },
    {
        headers:headers()
    }
    )
    .then((response)=>{
        return response.data
    })
}

const checkFollow = (userId) => {
    return axios.post(API_URL+"checkFollow",{
        userId: userId
    },
    {
        headers:headers()
    }
    )
    .then((response)=>{
        return response.data
    })
}

const fetchFollows = (userId,followType,page=1) => {
    return axios.post(API_URL+"getFollows",{
        userId,
        page,
        followType
    },
    )
    .then((response)=>{
        return response.data
    })
}

const getSuggestedUsers = () => {
    return axios.get(API_URL+"getSuggestedUsers",
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
    followActions,
    checkFollow,
    getSuggestedUsers,
    fetchFollows
}

export default exportedObject