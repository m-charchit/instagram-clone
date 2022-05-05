
const initialState = {isLoggedIn: localStorage.getItem("token") ? true : false}
const auth = (state=initialState , action) => {

    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoggedIn : false
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                isLoggedIn : false
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn : true,
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                isLoggedIn : false,
            }
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn:false,
            }
        default:
            return state;
    }
}

export default auth