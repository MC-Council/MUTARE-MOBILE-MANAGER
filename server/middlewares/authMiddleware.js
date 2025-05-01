import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {Council} from '../models/Council.js';

// For regular users
export const protectUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "User not authorized, no token" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = { userId: decoded._id };
        
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        next();
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: "User not authorized, token failed" 
        });
    }
};

// For councils/companies
export const protectCouncil = async (req, res, next) => {

    const token = req.headers.token

    if(!token){
        return res.json({success:false, message: "Not Authorized, Login Again"})
    }

    try {
        
        const  decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.council = await Council.findById(decoded.id).select('-password')

        next()



    } catch (error) {
        res.json({success:false, message: error.message })

    }
}