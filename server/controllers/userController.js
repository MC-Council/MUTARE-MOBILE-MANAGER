import DeviceApplication from "../models/deviceApplication.js";
import User from "../models/User.js";
import Device from "../models/Device.js"; // Make sure this import exists
import multer from 'multer';

// Get user data
const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Apply for device (fixed version)
const applyForDevice = async (req, res) => {
    try {
        const { deviceId } = req.body;
        const userId = req.auth.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Check if device exists
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }

        // Check if already applied
        const existingApplication = await DeviceApplication.findOne({ 
            userId, 
            deviceId 
        });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "Already applied for this device"
            });
        }

        // Create new application
        const newApplication = await DeviceApplication.create({
            userId,
            deviceId: device._id,
            councilId: device.councilId,
            status: "Pending",
            date: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Device application submitted successfully",
            application: newApplication
        });
    } catch (error) {
        console.error("Application error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user applied devices
const getUserAppliedDevices = async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const applications = await DeviceApplication.find({ userId })
            .populate('councilId', 'name email image')
            .populate('deviceId', 'name SN title location department');

        res.json({ 
            success: true, 
            applications: applications || []
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update return form
const updateReturnForm = async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(401).json({ 
                success: false, 
                message: "Unauthorized" 
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
                details: [
                    'Use form-data in Postman',
                    'Field name must be "return-form"',
                    'File must be PDF, JPEG or PNG',
                    'Max size 5MB'
                ]
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                return_form: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                    filename: req.file.originalname,
                    uploadedAt: new Date()
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.json({ 
            success: true, 
            message: "Return form updated successfully",
            file: {
                name: req.file.originalname,
                type: req.file.mimetype,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error('Return form error:', error);
        
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: 'File upload error',
                error: error.code,
                details: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

export {
    getUserData,
    applyForDevice,
    getUserAppliedDevices,
    updateReturnForm
};