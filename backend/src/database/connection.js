import mongoose from "mongoose" ; 
import ENV from "../config/env.js"; 

const createConnectionDb = async() => {
    try{
        await mongoose.connect(ENV.DB_URL).then(con => {
        console.log(`connection is done ${con.connection.host}`) ;
        })
    }catch(err) {
        console.log("Database connection error" , err)  ; 
        process.exit(1) ; 
    }
}

export default createConnectionDb ;