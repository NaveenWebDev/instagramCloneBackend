const express = require("express");
const app = express();
const sequelize =require("./Config/dbConnect");
const cloudinary = require("./Config/cloudinary");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/router");
const fileupload = require("express-fileupload");
cloudinary.cloudinaryConnect();
const {Server} = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server (server, {
    cors:{
        origin:"*"
    },
    credentials:true,
})

//middleware
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
})) 
app.use('/api/v1', router)

io.on("connection", (socket)=>{
    console.log("userConnted id is =", socket.id);

    //message for chat
    socket.on("message", (data)=>{
        console.log(data);
        socket.broadcast.emit("message", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


const port = process.env.PORT || 8000

server.listen(port, ()=>{
    console.log(`app is running on ${port} number`);
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })