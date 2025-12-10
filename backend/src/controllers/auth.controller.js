import User from "../models/user.module.js";
import sendEmail from "../emails/sendEmail.js" ;
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js" ; 
import asyncWrapper from "../middlewares/asyncWrapper.js" ;
import ENV from "../config/env.js";
 


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


    const user = await User.findOne({email : email}); 
    
    if(user) 
        throw new BadRequestError("Email already exists") ; 


    const newUser = await User.create({fullName , email , password}) ; 

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
    sendEmail(email , fullName , ENV.CLIENT_URL) ; 
})

const Login = asyncWrapper(async(req , res) => {
    const {email , passsword} = req.body ; 

    if (!email || !passsword) {
        throw new BadRequestError("All fields is required");
    }

    const user = await User.findOne({email : email}) ; 

    if (!user) 
        throw new BadRequestError("Email is not found") ; 
    
    const isMacth = await User.comparePassword(passsword) ; 

    if (!isMacth) 
        throw new BadRequestError("Password is not correct") ; 

    
    const token = User.createJwt() ; 

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    });

    res.status(StatusCodes.CREATED).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profileImage,
    }) 
})


const Logout = asyncWrapper(async(req , res)=> {
    res.cookies("jwt" , "" , {maxAge : 0}) ; 
    res.status(StatusCodes.OK).json({message : "Logout is success"}) ; 
})

export default {
    Signup , 
    Login , 
    Logout  , 
}