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
        return userData
    })
    .catch((error)=>{
        dispatch({
            type:"GET_USER_FAIL",
        })
    })
}

export const followActions = (userId,type) => (dispatch) => {
    return UserService.followActions(userId,type)
    .then((userData)=>{
        dispatch({
            type:"FOLLOW_ACTION_SUCCESS",
            payload:{user:userData}
        })
        return Promise.resolve
    })
    .catch((error)=>{
        dispatch({
            type:"FOLLOW_ACTION_FAIL",
        })
    })
}

export const checkFollow = (userId) => (dispatch) =>{
    return UserService.checkFollow(userId)
    .then((userData)=>{
        dispatch({
            type:"FOLLOW_CHECK_SUCCESS",
            payload:userData
        })
        return Promise.resolve
    })
    .catch((error)=>{
        dispatch({
            type:"FOLLOW_CHECK_FAIL",
        })
    })
}

