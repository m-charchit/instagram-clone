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
        default:
            return state
    }
}

export default user
