import fs from "fs";
import path from "path";
import ENV from "../config/env.js";
import User from "../models/user.module.js";
import sendEmail from "../emails/sendEmail.js" ;
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js" ; 
import asyncWrapper from "../middlewares/asyncWrapper.js" ;

 


const Signup = asyncWrapper(async(req , res)=> {

    const {fullName , email , password} = req.body ; 
    if (!fullName || !email || !password) 
        throw new BadRequestError("All fields is required");
    
    
    if (password.length < 6) 
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
   // sendEmail(email , fullName , ENV.CLIENT_URL) ; 


})


const Login = asyncWrapper(async(req , res) => {

    const {email , password} = req.body ; 

    if (!email || !password) {
        throw new BadRequestError("All fields is required");
    }

    const user = await User.findOne({email : email}) ; 

    if (!user) 
        throw new BadRequestError("Email is not found") ; 
    
    const isMacth = await user.comparePassword(password) ; 

    if (!isMacth) 
        throw new BadRequestError("Password is not correct") ; 

    
    const token = user.createJwt() ; 

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    });

    res.status(StatusCodes.OK).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
    }) 

})


const Logout = asyncWrapper(async(req , res)=> {

    res.cookie("jwt" , "" , {maxAge : 0}) ; 
    res.status(StatusCodes.OK).json({message : "Logout is success"}) ; 

})



const updateProfileImage = asyncWrapper(async(req, res) => {

    if(!req.file) {
        throw new BadRequestError("Profile Image is Required") ; 
    }

    const userId = req.user._id ; 

    if (req.user.profileImage) {
        const oldImagePath = path.join(process.cwd(), req.user.profileImage);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); 
        }
    }
    const fileName = req.file.filename ; 

    console.log(fileName) ; 

    const imageUrl = `images/${fileName}` ; 

    const updateUser = await User.findByIdAndUpdate(
        userId , 
        {
            profileImage : imageUrl
        } , 
        {
        new : true  , runValidators : true , 
    })
    res.status(StatusCodes.OK).json(updateUser) ; 


})


export default {
    Signup , 
    Login , 
    Logout  ,
    updateProfileImage  
}