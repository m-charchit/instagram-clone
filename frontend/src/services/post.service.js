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

const fetchPost = (postId) => {
    return axios.post(API_URL+"fetchPost",{postId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const fetchUserPosts = (userId) => {
    return axios.post(API_URL+"fetchUserPosts",{userId})
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
    fetchPost
}

export default exportedObject