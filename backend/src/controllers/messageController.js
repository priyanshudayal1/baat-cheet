import userModel from "../models/userModel.js";
import messageModel from '../models/messageModel.js';
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json({ users: allUsers });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    };
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await messageModel.find({ $or: [{ senderId: myId, receiverId: userToChatId }, { senderId: userToChatId, receiverId: myId }] })

        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;

        const receiverId = req.body.selectedUser._id;
        const myId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new messageModel({
            senderId: myId,
            receiverId,
            text,
            image: imageUrl
        });

        newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        };

        return res.status(201).json({ message: "sent successfully" });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    };
};