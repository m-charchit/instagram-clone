import axios from "axios";
import { headers } from "../constant/header";
const API_URL = "http://localhost:5000/api/comment/";

const fetchComments = (postId) => {
    return axios.post(API_URL+"fetchComments",{postId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const writeComment = (com,postId,parentCommentId) => {
    return axios.post(API_URL+"write",{com,postId,parentCommentId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const editComment = (commentId,com) => {
    return axios.post(API_URL+"edit",{commentId,com},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}

const deleteComment = (commentId) => {
    return axios.post(API_URL+"delete",{commentId},{
        headers:headers()
    })
    .then((response) => {
        return response.data
    })
}
const exportedObject = {
    fetchComments,
    writeComment,
    editComment,
    deleteComment
}

export default exportedObject