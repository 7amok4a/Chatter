import path from "path" ; 
import dotenv from "dotenv" ; 
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url) ; 
const __dirname = path.dirname(__filename) ; 


dotenv.config({path : path.resolve(__dirname , "../../.env")}) ; 


const ENV = {
    PORT : process.env.PORT , 
    DB_URL : process.env.DB_URL , 
}

console.log(ENV) ; 


export default ENV ; 