const express = require("express");
const app = express();
require("dotenv").config()
const cors = require("cors");
const sequelize =require("./Config/dbConnect");
const routes = require("./routes/router");
const fileupload = require("express-fileupload")
const cloudinary = require("./Config/cloudinary")

//middleware
app.use(express.json());
app.use(cors());
app.use(fileupload)
app.use('/api/v1', routes)

//cloudinary connection
cloudinary.cloudinaryConnect()

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`app is running on ${port} number`);
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })