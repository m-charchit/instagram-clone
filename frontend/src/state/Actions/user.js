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
export const getFollows = (userId,followType,page) => (dispatch) => {
    return UserService.fetchFollows(userId,followType,page)
    .then((data)=>{
        dispatch({
            type:"GET_FOLLOWS_SUCCESS",
            payload:data
        })
        return data
    })
    .catch((error)=>{
        dispatch({
            type:"GET_FOLLOWS_ERROR",
        })
    })
}


export const followActions = (userId,type,pUserId) => (dispatch) => {
    return UserService.followActions(userId,type,pUserId)
    .then((data)=>{
        dispatch({
            type:"FOLLOW_ACTION_SUCCESS",
            payload:data
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

export const getSuggestedUsers = () => (dispatch) => {
    return UserService.getSuggestedUsers()
    .then((data)=>{
        dispatch({
            type:"GET_SUGGESTED_USERS_SUCCESS",
            payload:data
        })
        return Promise.resolve
    })
    .catch((error)=>{
        dispatch({
            type:"GET_SUGGESTED_USERS_FAIL",
        })
    })
}
