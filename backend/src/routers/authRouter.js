import express from "express" ; 
import upload from "../middlewares/uploadFileMiddleware.js";
import authMiddleware from "../middlewares/authentication.js";
import authController from "../controllers/auth.controller.js";



const router = express.Router() ; 

// endpoint for auth

router.post("/signup" , authController.Signup)  ; 

router.post("/login", authController.Login); 

router.post("/logout" , authController.Logout) ; 


// in future we use cloud uploader  now we use multer disk sotrage 
router.put("/update-profileImage" , authMiddleware , upload.single("profileImage"), authController.updateProfileImage) ; 


router.get("/check", authMiddleware,(req, res) => res.status(200).json(req.user)); // refersh page 

export  default router ; 