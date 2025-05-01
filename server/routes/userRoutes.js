import express from 'express';
import { 
    getUserData,
    applyForDevice,
    getUserAppliedDevices,
    updateReturnForm
} from '../controllers/userController.js';
import { singleUpload } from '../config/multer.js';
import { protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User-only routes
router.get('/user', protectUser, getUserData);
router.get('/user', protectUser, getUserData);
router.post('/apply', protectUser, applyForDevice);
router.get('/applications', protectUser, getUserAppliedDevices);
router.post('/update-return-form', protectUser, singleUpload('return-form'), updateReturnForm);

export default router;