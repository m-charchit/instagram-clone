import axios from "axios";
import { headers } from "../constant/header";
const API_URL = "http://localhost:5000/api/post/";


const fetchPosts = () => {
    return axios.get(API_URL+"fetch",{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const fetchUserPosts = (username) => {
    return axios.post(API_URL+"fetchUserPosts",{username})
    .then((response) => {
        return response.data
    })
}

const uploadPost = (caption) => {
    return axios.post(API_URL + "upload",{
        caption
    },
    {
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

const likePost = (postId) => {
    return axios.post(API_URL+"like",{
        postId
    },
    {
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

const editPost = (caption,postId) => {
    return axios.post(API_URL+"edit",{
        caption,
        postId
    },
    {
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

const deletePost = (postId) => {
    return axios.post(API_URL+"edit",{
        postId
    },
    {
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

export default {
    fetchPosts,
    fetchUserPosts,
    uploadPost,
    likePost,
    editPost,
    deletePost
}