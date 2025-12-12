import { StatusCodes } from "http-status-codes";
import User from "../models/user.module.js";
import Message from "../models/message.module.js" ; 
import BadRequestError from "../errors/bad-request.js" ; 
import asyncWrapper from "../middlewares/asyncWrapper.js" ;


const getAllContacts =  asyncWrapper(async(req , res)=> {


    const loggedInUserId = req.user._id ; 

    const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password") ;
    
    res.status(StatusCodes.OK).json(filteredUsers) ; 


})


const getChatPartners = asyncWrapper(async(req , res)=> {
    
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
        $or: [
            {senderId: loggedInUserId}, {receiverId: loggedInUserId}
        ]
    })

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(StatusCodes.OK).json(chatPartners);


})

const getMessagesByUserId = asyncWrapper(async(req , res)=> {


    const loggedInUserId = req.user._id ; 
    const {id : userToChatId} = req.params ; 
    const messages = await Message.find({
        $or :[
            {senderId : loggedInUserId , receiverId : userToChatId} , 
            {senderId : userToChatId , receiverId : loggedInUserId}
        ]
    }) ; 

    res.status(StatusCodes.OK).json(messages) ; 

})


const sendMessages = asyncWrapper(async(req , res)=> {


    const {text} = req.body ; 
    const {id : receiverId} = req.params ; 
    const senderId = req.user._id;

    if (!text && !req.file) 
        throw new BadRequestError("Text or image is required.");
    

    if (senderId.equals(receiverId))   // use equals beacuse id is mongoose schema object 
        throw new BadRequestError("Cannot send messages to yourself.");
    


    const receiverExit = User.findById(receiverId) ; 
    if(!receiverExit) 
        throw new BadRequestError("Receiver is not found") ; 

    let imageUrl; 
    if(req.file) {
        const allowedFormat =  ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'] ; 

        if(!allowedFormat.includes(req.file.mimetype)) 
            throw new BadRequestError("Invalid image format. Only JPEG, PNG, GIF and WebP are allowed.");

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (req.file.size > maxSize) {
            throw new BadRequestError("Image size too large. Maximum 5MB allowed.");
        }

        const fileName = req.file.filename;
        console.log('Image uploaded:', fileName); // test 
        
        imageUrl = `images/${fileName}`;
    }


    const newMessage = await Message.create({senderId , receiverId , text , image : imageUrl}) ; 

    //todo socket io  
    res.status(StatusCodes.CREATED).json(newMessage);


})


export default {
    getAllContacts , 
    getChatPartners , 
    getMessagesByUserId , 
    sendMessages , 
}