const reverseComments = (array) => {
    array.docs.map((item)=>{
        return item.comments.reverse()
    })
    return array
}

const returnData = (state,action) => {
    
    if (state.userPosts ){
        let index = state.userPosts.docs.findIndex(({_id})=>_id === action.payload.post._id)
        if (index!==-1){
            state.userPosts.docs[index].comments = action.payload.post.comments.length  
            state.userPosts.docs[index].like = action.payload.post.like.length  
        }
    }
    if(state.posts){
        state.posts.docs[state.posts.docs.findIndex(({_id})=>_id === action.payload.post._id)] = {...action.payload.post,comments:action.payload.post.comments.reverse()}
        return {
            ...state,
            posts:state.posts,
            userPosts:state.userPosts
    } 
    }
        return {
            ...state,
            post:action.payload.post,
            userPosts:state.userPosts

    }

}

const post = (state={},action) => {
    switch (action.type) {
        case "FETCH_POSTS" :
            return {
                ...state,
                posts: reverseComments(state.posts  && state.posts.page !== action.payload.posts.page ?  {...action.payload.posts,docs:[...state.posts.docs, ...action.payload.posts.docs]} : action.payload.posts)
            }
        case "FETCH_LIKES" :
            state.posts.docs[state.posts.docs.findIndex(({_id})=>_id === action.payload.post._id)] = {...action.payload.post,like:action.payload}
            return {
                ...state,
                posts: state.posts
            }
        case "FETCH_POST_SUCCESS" :
            return {
                ...state,
                post: action.payload.posts
            }
        case "ORGANIZE_POST_SUCCESS" :
            return {
                ...state,
                post: action.payload.posts
            }
        case "FETCH_USER_POSTS" :
            return {
                ...state,
                userPosts: state.userPosts  && state.userPosts.page !== action.payload.posts.page ?  {...action.payload.posts,docs:[...state.userPosts.docs, ...action.payload.posts.docs]} : action.payload.posts
            }
        case "UPLOAD_POST_SUCCESS" :
            
                state.posts[state.posts.findIndex(({_id})=>_id === action.payload.post._id)] = action.payload.post
                return {
                    ...state,
                    posts: state.posts
                }
            
            
        case "LIKE_POST_SUCCESS" : 
            return returnData(state,action)
        case "ADD_COMMENT_SUCCESS":
            return returnData(state,action)
        case "DELETE_COMMENT_SUCCESS":
            return returnData(state,action)
        case "DELETE_POST_SUCCESS":
                return {
                    ...state,
                    posts:action.payload
            }
        
        default:
            return state
    }
}
export default post