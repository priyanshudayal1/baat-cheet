import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}


io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    };
    // io.emit() is used to send message to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };