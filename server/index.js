const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const blogRoutes = require("./routes/blog.route.js");
const cookieParser = require('cookie-parser');


const cors = require("cors")

const app = express();
require('dotenv').config();


const port = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;
//middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTED_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
}))

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}));

 cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
    });

mongoose.connect(MONGO_URL)
  .then(() => console.log("connected mongodb"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
