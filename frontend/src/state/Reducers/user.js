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
                user:action.payload.user
            }
        case "GET_USER_FAIL":
            return {
                ...state,
                user:null
            }
        case "FOLLOW_ACTION_SUCCESS":
            return {
                ...state,
                user:action.payload.user
            }
        case "FOLLOW_ACTION_FAIL":
            return {
                ...state,
            }
        default:
            return state
    }
}

export default user
