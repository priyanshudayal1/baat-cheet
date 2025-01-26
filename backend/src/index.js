import express from 'express';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { app, server } from './lib/socket.js';
import path from 'path';



dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload({

    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max-file-size

}));

//Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../baat-cheet/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../baat-cheet', 'dist', 'index.html'));
    });
};

//To start the Server
server.listen(PORT, () => {
    console.log('the server is upp on :', PORT);
    connectDB();
});