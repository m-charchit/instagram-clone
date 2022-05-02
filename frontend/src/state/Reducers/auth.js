
const initialState = localStorage.getItem("user")
const auth = (state=initialState , action) => {

    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                // @ts-ignore
                ...state,
                isLoggedIn : false
            }
        case "REGISTER_FAIL":
            return {
                // @ts-ignore
                ...state,
                isLoggedIn : false
            }
        case "LOGIN_SUCCESS":
            return {
                // @ts-ignore
                ...state,
                isLoggedIn : true,
                user: action.payload.user
            }
        case "LOGIN_FAIL":
            return {
                // @ts-ignore
                ...state,
                isLoggedIn : false,
                user:null
            }
        case "LOGOUT":
            return {
                // @ts-ignore
                ...state,
                isLoggedIn:false,
                user:null
            }
        default:
            return state;
    }
}

export default auth