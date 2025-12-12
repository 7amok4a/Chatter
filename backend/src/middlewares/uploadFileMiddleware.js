import multer from "multer" ; 


const storage =  multer.diskStorage({
        destination : (req , file , cb) => {
            cb(null , "images")
        }  ,
        filename : (req , file , cb) => {
            const safeName = file.originalname.replace(/\s+/g, '_') ; 
            cb(null , Date.now() + '_' + safeName) ; 
        }
})


const upload = multer({dest : "images" ,  storage : storage}) ; 


export default upload ; 

