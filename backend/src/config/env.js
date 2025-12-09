import path from "path" ; 
import dotenv from "dotenv" ; 
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url) ; 
const __dirname = path.dirname(__filename) ; 


dotenv.config({path : path.resolve(__dirname , "../../.env")}) ; 


const ENV = {
    PORT : process.env.PORT , 
    DB_URL : process.env.DB_URL , 
    JWT_SECRET : process.env.JWT_SECRET , 
    CLIENT_URL : process.env.CLIENT_URL , 
    Sender_Mail : process.env.Sender_Mail , 
    App_pass : process.env.App_pass , 
    NODE_ENV : process.env.NODE_ENV , 
}

console.log(ENV) ; 


export default ENV ; 