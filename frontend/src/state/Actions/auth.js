import AuthService from "../../services/auth.service"

export const register = (username,email,Name,password) => (dispatch) => {
    return AuthService.register(username,email,Name,password).then(
        (response)=>{
            dispatch({
                type:"REGISTER_SUCCESS"
            });
            return Promise.resolve;
        },
        (error) => {
            dispatch({
                type: "REGISTER_FAIL"
            })
            return Promise.reject()
        }
    )
}

export const login = (username,password) => (dispatch) => {
    return AuthService.login(username,password).then(
        (data) => {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload : {user: data.user}
            })
            return Promise.resolve()
        },
        (error) => {
            dispatch({
                type:"LOGIN_FAIL"
            })
            return Promise.reject();
        }
    )
}
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type : "LOGOUT"
    })
}