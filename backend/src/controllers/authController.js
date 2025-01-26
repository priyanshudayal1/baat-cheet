import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import { generateJWTToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!password || !fullName || !email) {
            return res.status(400).json({ message: 'All fields full name, password and email are required.', success: false });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password length must be at least 6 characters', success: false });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email is already registered.', success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            fullName: fullName,
            email: email,
            password: hashedPassword
        });
        if (newUser) {
            //generate jwt
            const token = generateJWTToken(newUser._id, res);
            await newUser.save();
            return res.status(200).json({
                message: "User created successfully", _id: newUser._id, fullName:
                    newUser.fullName, email: newUser.email, profilePice: newUser.profilePic, success: true
            })
        } else {
            return res.status(400).json({ message: 'Invalid user data', success: false });
        }

    } catch (err) {
        return res.status(400).json({
            message: `An error has occurred : ${err}`, success: false
        })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                const token = generateJWTToken(user._id, res);
                return res.status(200).json({
                    message: "Login successful", _id: user._id, fullName:
                        user.fullName, email: user.email, profilePice: user.profilePic, success: true
                });
            } else {
                return res.status(400).json({ message: "Incorrect password", success: false })
            }
        } else {
            return res.status(400).json({ message: "No user found with the credentials", success: false });
        }
    } catch (err) {
        return res.status(400).json({
            message: `An error occurred : ${err}`, success: false
        });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie('authToken', "", { maxAge: 0 });
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName, removeProfilePic } = req.body;
        const userId = req.user._id;
        
        const updateData = {};
        
        if (fullName) {
            updateData.fullName = fullName;
        }
        
        if (removeProfilePic) {
            updateData.profilePic = ""; // or your default avatar URL
        } else if (profilePic && profilePic.startsWith('data:image')) {
            // Only upload if it's a new image (base64 string)
            const uploadUrl = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = uploadUrl.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        return res.status(200).json({ 
            message: "Profile updated successfully",
            user: updatedUser,
            success: true 
        });
    } catch (err) {
        return res.status(400).json({ 
            message: 'Internal server error', 
            success: false,
            error: err.message 
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ message: "Internal server error" });
    }
};