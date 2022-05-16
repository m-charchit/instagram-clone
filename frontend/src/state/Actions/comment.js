import CommentService from "../../services/comment.service"

export const fetchComments = (postId) => (dispatch) => {
    return CommentService.fetchComments(postId).then(
        (data)=>{
            dispatch({
                type:"FETCH_COMMENTS_SUCCESS",
                payload:{comments: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"FETCH_COMMENTS_FAIL"
            })
            return Promise.reject
        }
    )
}

export const writeComment = (com,postId,parentCommentId) => (dispatch) => {
    return CommentService.writeComment(com,postId,parentCommentId).then(
        (data)=>{
            dispatch({
                type:"WRITE_COMMENT_SUCCESS",
                payload:{comment: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"WRITE_COMMENT_FAIL"
            })
            return Promise.reject
        }
    )
}

export const editComment = (commentId,com) => (dispatch) => {
    return CommentService.editComment(commentId,com).then(
        (data)=>{
            dispatch({
                type:"EDIT_COMMENT_SUCCESS",
                payload:{comment: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"EDIT_COMMENT_FAIL"
            })
            return Promise.reject
        }
    )
}

export const deleteComment = (commentId) => (dispatch) => {
    return CommentService.deleteComment(commentId).then(
        (data)=>{
            dispatch({
                type:"DELETE_COMMENTS_SUCCESS",
                payload:{comments: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"DELETE_COMMENTS_FAIL"
            })
            return Promise.reject
        }
    )
}