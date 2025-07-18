import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
    return jwt.sign(
        { userId},
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    );
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};