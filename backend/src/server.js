import cors from "cors" ; 
import helmet from "helmet";
import express from "express" ; 
import ENV from "./config/env.js"; 
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRouter from "./routers/authRouter.js" ; 
import routerMessage from "./routers/messageRouter.js"  ; 
import authMiddleware from "./middlewares/authentication.js";
import createConnectionDb from "./database/connection.js";
import notFoundMiddleware from "./middlewares/notFoundHandler.js" ; 
import errorHandlerMiddleware from "./middlewares/errorHandler.js" ; 


const app = express() ; 

// middlewares and secrity options 
app.use(cors(
    {
        origin : ENV.CLIENT_URL , 
        credentials : true , 
    }
)) ; 

app.use(rateLimit({
    windowMs : 15*60*1000 , 
    max : 10 , // 10 request for per windowMs i minimize it to test ratelimit 
}))

app.use(helmet()) ; 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser()) ; 


// //static for images 
// app.use(
//   "/images",
//   cors({ origin: ENV.CLIENT_URL }), // allow cross-origin requests
//   express.static(path.join(process.cwd(), "images"), {
//     setHeaders: (res, filePath) => {
//       res.setHeader("Cross-Origin-Resource-Policy", "same-site"); //
//     },
//   })
// );

//endpoint 
app.use("/api/v1/auth" , authRouter) ; 
app.use("/api/v1/messages" , authMiddleware , routerMessage) ; 
app.use(errorHandlerMiddleware) ;
app.use(notFoundMiddleware) ; // not founde endpoint  

const start = async()=> {
    try {
        await createConnectionDb() ; 
        app.listen(ENV.PORT , console.log(`Server is running in http://localhost${ENV.PORT}`)) ; 
    }catch(err) {
        console.log(err) ; 
    }
}


start() ; 