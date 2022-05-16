const comment = (state={},action) => {
    switch (action.type) {
        case "FETCH_COMMENTS_SUCCESS" :
            return {
                ...state,
                comments: action.payload.comments
            }
        case "WRITE_COMMENT_SUCCESS" :
            state.comments[state.comments.findIndex(({_id})=>_id === action.payload.comment._id)] = action.payload.comment
            return {
                ...state,
                comments: state.comments
            }
        case "EDIT_COMMENT_SUCCESS" :
            state.comments[state.comments.findIndex(({_id})=>_id === action.payload.comment._id)] = action.payload.comment
            return {
                ...state,
                comments: state.comments
            }
        case "DELETE_COMMENTS_SUCCESS" : 
            return {
                ...state,
                comments:action.payload.comments
            }
        
        default:
            return state
    }
}
export default comment