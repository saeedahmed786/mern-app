import jwt from 'jsonwebtoken';
import { jwtSecret } from './config/dev';

exports.authenticatorJWT = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(404).json({
            err: 'No Token. Access Denied'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log('jwt error in cateogory', err);
        res.status(401).json({
            err: 'invalid token'
        });
        
    }
}