const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
    try {
        let token
        const token_app = req.headers['authorization'];
        const token_web = req.cookies.token

        console.log({token_app, token_web})
    
        if(!token_app && !token_web){
            res.status(401)
            throw new Error("Not authorized, Please login to continue!")
        }else if(!token_web && token_app) {
            token = token_app            
        }else if(token_web && !token_app) {
            token = token_web  
        }
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // Get user id from token
        const user = await User.findById(verified.id).select("-password")
        if(!user) {
            res.status(401)
            throw new Error("User fot found")
        }
        req.user = user
        
        next()
    } catch (error) {
        res.status(401)
        throw new Error("Not aurhorized, Please login!!")
    }
})

module.exports = protect