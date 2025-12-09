import bcrypt from "bcrypt" ; 
import mongoose from "mongoose";
import jwt from "jsonwebtoken" ; 
import ENV from "../utils/env.js" ; 

console.log(ENV.JWT_SECRET) ; // test  


const userSchema = new mongoose.Schema ({

    fullName : {
        type : String  , 
        required : true   , 
    } , 

    email : {
        type : String  , 
        required : true , 
        unique : true , 
    } , 


    password : {
        type : String , 
        required : true , 
        minlength : 6 , 
    } , 

    profileImage : {
        type : String , 
        default : ""  
    }

     
} , {timestamps : true})


userSchema.pre('save' , async function (){

    if (!this.isModified("password")) ; // if data updated 
    
    const salt = await bcrypt.genSalt(10) ; 

    this.password = await bcrypt.hash(this.password , salt) ; 
 

})

userSchema.methods.comparePassword = async function(enterPassword) {

    const isMatch = await bcrypt.compare(enterPassword , this.password) ;
    
    return isMatch ;  
}


userSchema.methods.createJwt= function(){
    
    if (!ENV.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    console.log(this._id) ; // test 

    return jwt.sign({userId : this._id} , ENV.JWT_SECRET , {expiresIn : "1d"})  
}

const User = mongoose.model("User"  , userSchema) ; 

export default User ; 