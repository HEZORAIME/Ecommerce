import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role},
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