import UserService from "../../services/user.service"

export const getCurrentUser = () => (dispatch) => {
    return UserService.getCurrentUser()
    .then((userData)=>{
        dispatch({
            type:"GET_CURRENT_USER_SUCCESS",
            payload:{user:userData}
        })
        return Promise.resolve
    })
    .catch((error)=>{
        dispatch({
            type:"GET_CURRENT_USER_FAIL",
        })
    })
}
export const getUser = (username) => (dispatch) => {
    return UserService.getUser(username)
    .then((userData)=>{
        dispatch({
            type:"GET_USER_SUCCESS",
            payload:{user:userData}
        })
        return Promise.resolve
    })
    .catch((error)=>{
        dispatch({
            type:"GET_USER_FAIL",
        })
    })
}
