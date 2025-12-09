import User from "../models/user.module.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js" ; 
import asyncWrapper from "../middlewares/asyncWrapper.js" ;



const Signup = asyncWrapper(async(req , res)=> {

    const {fullName , email , passsword} = req.body ; 
    if (!fullName || !email || !passsword) 
        throw new BadRequestError("All fields is required");
    
    
    if (passsword.length < 6) 
        throw new BadRequestError("password is very short") ; 
    
    
    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format") ; 
    }


    const user = User.findOne({email : email}); 
    
    if(user) 
        throw new BadRequestError("Email already exists") ; 


    const newUser = User.create({fullName , email , password}) ; 

    const token = newUser.createJwt() ; 

    res.cookie("jwt" , token , {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    })

    res.status(StatusCodes.CREATED).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profileImage,
    }) ; 

    // to do send welcome email 
})

const Login = asyncWrapper(async(req , res) => {

})


const Logout = asyncWrapper(async(req , res)=> {

})

export default {
    Signup , 
    Login , 
    Logout  , 
}