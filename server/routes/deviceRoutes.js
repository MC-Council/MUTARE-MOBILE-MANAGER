import express from 'express'
import { getDevices, getDevicesById  } from '../controllers/deviceController.js';

const router = express.Router()

// Route to get all devices data
router.get('/', getDevices)


// Route to get a single device by ID

router.get('/:id', getDevicesById)


export default router;