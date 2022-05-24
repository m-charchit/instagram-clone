
const post = (state={},action) => {
    switch (action.type) {
        case "FETCH_POSTS" :
            return {
                ...state,
                posts: state.posts  && state.posts.page !== action.payload.posts.page ?  {...action.payload.posts,docs:[...state.posts.docs, ...action.payload.posts.docs]} : action.payload.posts
            }
        case "FETCH_POST_SUCCESS" :
            return {
                ...state,
                posts: [action.payload.posts]
            }
        case "ORGANIZE_POST_SUCCESS" :
            return {
                ...state,
                posts: [action.payload.posts]
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
            state.posts[state.posts.findIndex(({_id})=>_id === action.payload.post._id)] = action.payload.post
            return {
                ...state,
                posts:state.posts
            }
        case "ADD_COMMENT_SUCCESS":
                state.posts[state.posts.findIndex(({_id})=>_id === action.payload.post._id)] = action.payload.post
                return {
                    ...state,
                    posts:state.posts
            }
        case "DELETE_COMMENT_SUCCESS":
                state.posts[state.posts.findIndex(({_id})=>_id === action.payload.post._id)] = action.payload.post
                return {
                    ...state,
                    posts:state.posts
            }
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