const jwt = require('jsonwebtoken');
//todo=> secret key should be in .env
const SECRET_KEY = 'ABCD1234';

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY);
}
export const verifyToken = (token) => {
    try { 
        return jwt.verify(token, SECRET_KEY);
    }catch(error) {
        console.error("Token verifcation error:  ", error);
        return null;
    }
}

export const decodeToken = (token) => {
    return jwt.decode(token)
}