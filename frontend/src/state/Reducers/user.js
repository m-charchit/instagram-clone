const user = (state={},action) => {
    switch (action.type) {
        case "GET_CURRENT_USER_SUCCESS":
            return {
                ...state,
                currentUser:action.payload.user
            }
        case "GET_CURRENT_USER_FAIL":
            return {
                ...state,
                currentUser:null
            }
        case "GET_USER_SUCCESS":
            return {
                ...state,
                user:action.payload.user,
                users:undefined

            }
        case "GET_USER_FAIL":
            return {
                ...state,
                user:null
            }
        case "FOLLOW_ACTION_SUCCESS":
            return {
                ...state,
                currentUser:action.payload.followingUser,
                user:{...state.user,...action.payload.user},
                users:undefined
            }
        case "FOLLOW_ACTION_FAIL":
            return {
                ...state,
            }
        case "FOLLOW_CHECK_SUCCESS":
            return {
                ...state,
                user:{...state.user,...action.payload}
            }
        case "GET_FOLLOWS_SUCCESS":
            if(state.user.followers && state.user.followings){
                if (action.payload.followers){
                    action.payload.followers.docs = state.user.followers.nextPage !== action.payload.followers.nextPage ? [...state.user.followers.docs,...action.payload.followers.docs] : action.payload.followers.docs
                }else {
                    action.payload.followings.docs = state.user.followings.nextPage !== action.payload.followings.nextPage ? [...state.user.followings.docs,...action.payload.followings.docs] : action.payload.followers.docs
    
                }
            }
            return {
                ...state,
                user: {...state.user,...action.payload}
            }
        case "FOLLOW_CHECK_FAIL":
            return {
                ...state,
            }
        case "GET_SUGGESTED_USERS_SUCCESS":
            return {
                ...state,
                users:action.payload
            }
        default:
            return state
    }
}

export default user
