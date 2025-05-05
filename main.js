const express = require ("express")
const colors = require ("colors");
const multer = require("multer")
const path = require('path');
const cors = require('cors')

const errorHandler = require("./server/middlewares/errorHandler");
const connectDB = require("./server/config/db.config");

require('dotenv').config()



const app = express();
const PORT = process.env.PORT || 5000;
connectDB()



// body parse  

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//  cors setup
app.use(cors({
    origin: 'https://machine-task-mu.vercel.app/', // or your frontend URL
    credentials: true
}));


//  Serve uploads folder publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/",(req,res)=> {
    res.json({
        msg : "WELCOME TO INFLUENSER API"
    })
})

// auth routes 

app.use("/api/auth", require("./server/routes/authRoutes"))

// user routes

app.use("/api/user", require("./server/routes/userRoutes"))

// auth routes 

app.use("/api/admin", require("./server/routes/adminRoutes"))

// error Handler

app.use(errorHandler) 


app.listen(PORT,()=> console.log(`SERVER IS RUNNING AT PORT ${PORT}`.bgBlue.white))