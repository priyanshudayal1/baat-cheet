import jwt from 'jsonwebtoken';

export const generateJWTToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie('authToken', token, {
        maxAge: 7 * 24 * 60 * 1000, //ms
        httpOnly: true,
        sameSite: 'strict', //csrf attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development',
    });
};

