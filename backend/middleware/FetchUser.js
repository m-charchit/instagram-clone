const jwt = require("jsonwebtoken")
const JWT_STRING = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"


const fetchUser = (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token , JWT_STRING)
        // @ts-ignore
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchUser
