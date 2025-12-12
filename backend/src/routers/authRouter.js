import express from "express" ; 
import upload from "../middlewares/uploadFileMiddleware";
import authMiddleware from "../middlewares/authentication";
import authController from "../controllers/auth.controller";



const router = express.Router() ; 

// endpoint for auth

router.post("/signup" , authController.Signup)  ; 

router.post("/login", authController.Login); 

router.post("/logout" , authController.Logout) ; 


// in future we use cloud uploader  now we use multer disk sotrage 
router.put("/update-profileImage" , authMiddleware , upload.single("profileImage"), authController.updateProfileImage) ; 

export  default router ; 