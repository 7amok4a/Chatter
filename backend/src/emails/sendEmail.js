import ENV from "../config/env.js"; 
import nodemailer from "nodemailer"; 
import {createWelcomeEmailTemplate} from "./emailTemplates.js" ; 

const sendEmail = (email , name , clienturl)=> {
    const transport = nodemailer.createTransport({
    service : "gmail" , 
    auth : {
        user :  ENV.Sender_Mail , 
        pass : ENV.App_pass ,  
    }
    })

    const mailOptions = {
        from : ENV.Sender_Mail , 
        to : email , 
        subject : "Welcome To our Website"  , 
        html :  createWelcomeEmailTemplate(name , clienturl) ,  

    }

    transport.sendMail(mailOptions , (error , success)=> {
        if (error) 
            console.log(err) ; 
        else 
            console.log(success.response) ; 
    })
} 


export default sendEmail ; 