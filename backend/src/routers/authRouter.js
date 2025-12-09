import express from "express" ; 
import authController from "../controllers/auth.controller";


const router = express.Router() ; 

// endpoint for auth

router.post("/signup" , authController.Signup)  ; 

router.post("/login", authController.Login); 

router.post("/logout" , authController.Logout) ; 



export  default router ; 