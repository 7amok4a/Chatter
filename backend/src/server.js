import express from "express" ; 
import ENV from "./config"
const app = express() ; 

app.listen(ENV.PORT , console.log(`Server is running in http://localhost${ENV.PORT}`)) ; 