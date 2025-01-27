require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// handling cors policy issue 
const corsOption = {
    origin:"http://localhost:5173",
    methods:"GET ,POST ,PUT ,DELETE ,PATCH , HEAD",
    credentials: true,
}

app.use(cors(corsOption));

app.use(express.json());// To use json , add Express middleware that 
// parses incoming req bodies with JSON payloads.

//Mount the router : To use the router in your main express app,
// you can mount it at a specific URL prefix
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

// lets define admin route
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Server is running at port: ${PORT}`);
    });
})
