import axios from "axios";
import { headers } from "../constant/header";
const API_URL = "http://localhost:5000/api/post/";


const fetchPosts = (page) => {
    return axios.get(API_URL+"fetch",{
        params:{page},
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const fetchPost = (postId) => {
    return axios.post(API_URL+"fetchPost",{postId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const checkLike = (postId) => {
    return axios.post(API_URL+"checkLike",{postId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const fetchUserPosts = (userId,page) => {
    return axios.post(API_URL+"fetchUserPosts",{userId,page})
    .then((response) => {
        return response.data
    })
}

const fetchLikes = (postId,page) => {
    return axios.post(API_URL+"fetchLikes",{postId,page},{headers:headers()})
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

const likePost = (postId,page) => {
    return axios.post(API_URL+"like",{
        postId,page
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
    return axios.post(API_URL+"delete",{
        postId
    },
    {
        headers:headers()
    })
    .then((response)=>{
        return response.data
    })
}

const addComment = (com,postId,parentCommentId) => {
    return axios.post(API_URL+"addComment",{com,postId,parentCommentId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}
const deleteComment = (commentId) => {
    return axios.post(API_URL+"deleteComment",{commentId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const exportedObject = {
    fetchPosts,
    fetchUserPosts,
    uploadPost,
    likePost,
    editPost,
    deletePost,
    addComment,
    deleteComment,
    fetchPost,
    fetchLikes,
    checkLike
}

export default exportedObject