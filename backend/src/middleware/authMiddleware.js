import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';



export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(400).json({ message: "Unauthorized - user not logged in", success: false });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: "Unauthorized - Invalid token", success: false });
        };
        const user = await userModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        };
        req.user = user;
        next();
    } catch (err) {
        console.error('error:',err);
        return res.status(400).json({
            message: "Internal server error",
            success: false
        });
    };
};