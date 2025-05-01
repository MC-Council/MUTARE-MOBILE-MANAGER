import express from 'express';
import { 
  registerUser, 
  loginCouncil, 
  getCouncilData, 
  postDevice, 
  getDeviceApplicants, 
  getCouncilPostedDevices, 
  changeDeviceApplicationStatus, 
  changeDeviceVisibility,
  deleteDevice 
} from '../controllers/councilController.js';
import { protectCouncil } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginCouncil);
router.get('/council', protectCouncil, getCouncilData);
router.post('/post-device', protectCouncil, postDevice);
router.get('/applicants', protectCouncil, getDeviceApplicants);
router.get('/device', protectCouncil, getCouncilPostedDevices);
router.post('/change-status', protectCouncil, changeDeviceApplicationStatus);
router.post('/change-visibility', protectCouncil, changeDeviceVisibility);
router.delete('/device/:id', protectCouncil, deleteDevice);

export default router;