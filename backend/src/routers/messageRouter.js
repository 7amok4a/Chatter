import express from "express" ; 
import upload from "../middlewares/uploadFileMiddleware.js" ; 
import messagesController from "../controllers/message.controller.js" ; 


const router = express.Router() ; 



router.get("/contacts", messagesController.getAllContacts);
router.get("/chats", messagesController.getChatPartners);
router.get("/:id", messagesController.getMessagesByUserId);
//router.post("/send/:id", messagesController.sendMessage);


router.post("/sends/:id" , upload.single('image') , messagesController.sendMessages); // multer server storage 



export default router ; 