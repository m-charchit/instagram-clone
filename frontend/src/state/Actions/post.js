import PostService from "../../services/post.service";

export const fetchPosts = (page) => (dispatch) => {
    
    return PostService.fetchPosts(page).then(
        (data)=>{
            dispatch({
                type:"FETCH_POSTS",
                payload:{posts: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"FETCH_POSTS_FAIL"
            })
            return Promise.reject
        }
    )
}
export const getLikes = (postId,page) => (dispatch) => {
    
    return PostService.fetchLikes(postId,page).then(
        (data)=>{
            dispatch({
                type:"FETCH_LIKES",
                payload:{...data,postId}
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"FETCH_POSTS_FAIL"
            })
            return Promise.reject
        }
    )
}

export const organizeComments = (post) => (dispatch) => {
    post.comments.forEach((e)=>{
        // let name = e.comment.split(" ")[0]
        // if(e.comment.startsWith("@")){
        //     e.comment = e.comment.replace(name,`<Link to="/profile/${name.slice(1,)}"><Link>`)
        // }
        
        if(e.parentComment !== undefined){
            post.comments.forEach((b)=>{
             if (b._id === e.parentComment){
                 b.childComments.push(e)             
             }   
            })
        }}
            )
    
    post.comments = post.comments.filter((item)=>{
      return item.parentComment === undefined
    })
    console.log(post,"Sef")
       dispatch({
                type:"ORGANIZE_POST_SUCCESS",
                payload:{posts: post }
            })
}

export const fetchPost = (postId) => (dispatch) => {
    return PostService.fetchPost(postId).then(
        (data)=>{
            dispatch({
                type:"FETCH_POST_SUCCESS",
                payload:{posts: data }
            })
            dispatch(checkLike(postId))
            return Promise.resolve(data)
        },
        (error)=>{
            dispatch({
                type:"FETCH_POSTS_FAIL"
            })
            return Promise.reject
        }
    )
}
export const checkLike = (postId) => (dispatch) => {
    return PostService.checkLike(postId).then(
        (data)=>{
            dispatch({
                type:"CHECK_LIKE_SUCCESS",
                payload:{data,postId}
            })
            return Promise.resolve(data)
        },
        (error)=>{
            dispatch({
                type:"CHECK_LIKE_FAIL"
            })
            return Promise.reject
        }
    )
}

export const fetchUserPosts = (userId,page) => (dispatch) => {
    return PostService.fetchUserPosts(userId,page).then(
        (data)=>{
            dispatch({
                type:"FETCH_USER_POSTS",
                payload:{posts: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"FETCH_USER_POSTS_FAIL"
            })
            return Promise.reject
        }
    )
}

export const uploadPost = (caption) => (dispatch) => {
    return PostService.uploadPost(caption).then(
        (data)=>{
            dispatch({
                type:"UPLOAD_POST_SUCCESS",
                payload:{post: data }
            })
            return Promise.resolve
        },
        (error)=>{
            dispatch({
                type:"UPLOAD_POST_FAIL"
            })
            return Promise.reject
        }
    )
}

export const likePost = (postId,page) => (dispatch) => {
    return PostService.likePost(postId,page).then(
        (data)=>{
            console.log(data)
            dispatch({
                type:"LIKE_POST_SUCCESS",
                payload:{post: {...data,_id:postId} }
            })
            dispatch(getLikes(postId,page))
            dispatch(checkLike(postId))
            return data
        },
        (error)=>{
            dispatch({
                type:"LIKE_POST_FAIL"
            })
            return Promise.reject
        }
    )
}

export const addComment = (com,postId,parentCommentId) => (dispatch) => {
    return PostService.addComment(com,postId,parentCommentId).then(
        (data)=>{
            dispatch({
                type:"ADD_COMMENT_SUCCESS",
                payload:{post: data }
            })
            return data
        },
        (error)=>{
            dispatch({
                type:"ADD_COMMENT_FAIL"
            })
            return Promise.reject
        }
    )
}
export const deleteComment = (commentId) => (dispatch) => {
    return PostService.deleteComment(commentId).then(
        (data)=>{
            dispatch({
                type:"DELETE_COMMENT_SUCCESS",
                payload:{post: data }
            })
            return data
        },
        (error)=>{
            dispatch({
                type:"DELETE_COMMENT_FAIL"
            })
            return Promise.reject
        }
    )
}
export const deletePost = (postId) => (dispatch) => {
    console.log("S")
    return PostService.deletePost(postId).then(
        (data)=>{
            console.log(data)
            dispatch({
                type:"DELETE_POST_SUCCESS",
                payload:data
            })
            return data
        },
        (error)=>{
            dispatch({
                type:"DELETE_POST_FAIL"
            })
            return Promise.reject
        }
    )
}