import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/db.js';
import cors from "cors";
import appRouter from './src/routes/app.routes.js';

dotenv.config({
    path:'.env'
})

const app = express();

app.use(cors({origin:process.env.CORS}));
app.use(express.json({limit:"500kb"}))
app.use(express.urlencoded({extended:true, limit:"500kb"}));
app.use(express.static("public"))
app.use( "/api/v1", appRouter )




connectDB().then(()=>{
    app.listen(process.env.PORT  || 8000,()=>{
        console.log(`Server listening on port ${process.env.PORT}` );
    })
}).catch((error)=>{
    console.log(`Server error: ${error}`);}
)