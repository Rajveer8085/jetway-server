import express from "express"
import cors from "cors"
import route from "./Routes/Route.js"
import connectDb from "./Db/connectDb.js";

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    'https://jetway-sable.vercel.app'
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true // Add this if you're using cookies/auth
  }));

app.use(express.json())

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"
connectDb(DATABASE_URL)

app.use(route)


const port = process.env.PORT || 3003

app.listen(port,()=>{
    console.log(`this server is listening at http://localhost:${port}`);
})
