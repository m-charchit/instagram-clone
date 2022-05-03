
const post = (state={},action) => {
    switch (action.type) {
        case "FETCH_POSTS" :
            return {
                ...state,
                posts: action.payload.posts
            }
        case "FETCH_USER_POSTS" :
            return {
                ...state,
                posts: action.payload.posts
            }
        case "UPLOAD_POST_SUCCESS" :
            return {
                ...state,
                posts: {...state, ...action.payload.post}
            }
        
        default:
            return state
    }
}
export default post