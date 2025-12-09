import jwt from "jsonwebtoken" ; 
import ENV from "../utils/env.js";
import User from "../models/user.module.js";
import unAuthenticatedError from "../errors/unAuthError.js" ; 



const authMiddleware = async(req , res , next)=>  {
    try {
        const token = req.cookies.jwt ; 
        
        if (!token) 
            throw new unAuthenticatedError("Authorization is invailed1") ; 
        

        const payload = jwt.verify(token , ENV.JWT_SECRET) ; 

        if (!payload) 
            throw new unAuthenticatedError("Authorization is invailed2") ; 

        const user = await User.findById(payload.userId).select("-password") ; 

        req.user = user ; 
        next() ; 

    }catch{
        throw new unAuthenticatedError("Authorization is invailed3") ; 
    }
}



// if you send headers use this 

/*

const authMiddleware = (req , res , next)=> { 
    const authHeader = req.headers.authorization ; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
        throw new Errors.unAuthenticatedError ('Authorization is invaild1') ;
    
    const token = authHeader.split(' ')[1] ; 

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        // const user = User.findById(payload.id).select('-password') ; 
        // req.user = user ; 
        req.user = {userId : payload.userId , name : payload.name} ;  
        next() ; 
    }catch(err) {
        throw new Errors.unAuthenticatedError('Authorization is invaild')  ;
    }
}

*/


export default authMiddleware ; 