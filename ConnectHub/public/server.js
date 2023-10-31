import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const PORT = process.env.PORT;
console.log(__dirname);
app.use('/assets', express.static(__dirname));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

httpServer.listen(PORT,()=>{
    console.log("Server Started");
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("Connected");

    socket.on('message',(msg)=>{

        socket.broadcast.emit('message',msg);

    });
})
