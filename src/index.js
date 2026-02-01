
import dotenv  from "dotenv"
import connectDB from "./db/index.DB.js";
import express from "express"

dotenv.config({path:'/.env'});








connectDB()





// const app=express();









// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERRR",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//         console.log("Listening at Port 8000")})
//     }
//     catch(error){
//         console.log("ERROR:",error)
//         throw error
//     }
// })()