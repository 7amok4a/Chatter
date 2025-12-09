import express from "express" ; 
import ENV from "./config"
import authRouter from "../routers/authRouter.js" ; 
import createConnectionDb from "./database/connection.js";
import notFoundMiddleware from "./middlewares/notFoundHandler.js" ; 
import errorHandlerMiddleware from "./middlewares/errorHandler.js" ; 


const app = express() ; 

// middlewares 
app.use(express.json()) ; 


//endpoint 
app.use("/api/v1/auth" , authRouter) ; 
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