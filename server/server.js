import express from 'express';
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/user.routes.js"
import userRouter  from './routes/userData.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import cartRouter from './routes/cart.routes.js';


const app =  express();
const port = process.env.PORT || 4000
connectDb();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

// API endpoints
app.get('/',(req,res)=>{
    res.send("Home Page")
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

app.listen(port, ()=> console.log(`Server is runnning on Port: ${port}`))