import express from 'express'
import { Server } from 'socket.io'
import {createServer} from 'http'

const app = express();
const PORT = 8000;
const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

let users = []
io.on("connection",(socket)=>{

    console.log("New user connected :", socket.id)

    socket.emit("current-users", users);

    socket.on("user-joined",userData=>{
        users.push({socketId:userData.socketId,userId:userData.userId})
        // socket.broadcast.emit("new-user-joined", { id: userData.id, name: userData.name });
        socket.broadcast.emit("new-user-joined", {socketId:userData.socketId,userId:userData.userId});
    })

    socket.on("message",data=>{
        io.to(data.receiverId).emit("receive-msg",data)
    })

    socket.on("disconnect",()=>{
        users = users.filter((item)=>{item.socketId !== socket.id})
        console.log("User disconnected :",socket.id)
        io.emit("current-users", users);
    })

})

server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})