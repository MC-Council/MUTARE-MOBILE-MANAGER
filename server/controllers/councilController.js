// councilController.js (Backend - No changes needed for the "type" error, but including for completeness)
import bcrypt from 'bcrypt';
import { Council } from "../models/Council.js";
import generateToken from '../utils/generateToken.js';
import Device from '../models/device.js';
import DeviceApplication from '../models/deviceApplication.js';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing Details" });
    }

    try {
        const councilExist = await Council.findOne({ email });
        if (councilExist) {
            return res.status(400).json({ success: false, message: "Council Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const council = await Council.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(201).json({
            success: true,
            council: {
                _id: council._id,
                name: council.name,
                email: council.email,
            },
            token: generateToken(council._id),
        });
    } catch (error) {
        console.error("Error in register Admin User:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginCouncil = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing Email or Password" });
    }

    try {
        const council = await Council.findOne({ email });

        if (!council) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, council.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        res.status(200).json({
            success: true,
            council: {
                _id: council._id,
                name: council.name,
                email: council.email,
            },
            token: generateToken(council._id),
        });
    } catch (error) {
        console.error("Error in loginCouncil:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCouncilData = async (req, res) => {
    const council = req.council;

    try {
        res.status(200).json({ success: true, council });
    } catch (error) {
        console.error("Error in getCouncilData:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const postDevice = async (req, res) => {
    const { name,corporate_email, title, type, mm_no, SN, storage, memory, location, department, description } = req.body;
    const councilId = req.council._id;

    if (!councilId) {
        console.error("Error: councilId is undefined");
        return res.status(500).json({ success: false, message: "councilId is undefined" });
    }

    if (typeof description !== 'string') {
        console.error("Error: description is not a string");
        return res.status(500).json({ success: false, message: "description is not a string" });
    }

    console.log("Council ID:", councilId);
    console.log("Description:", description);

    try {
        const newDevice = new Device({
            name,
            mm_no,
            corporate_email,
            title,
            SN,
            type,
            storage,
            memory,
            department,
            description,
            location,
            councilId,
            date: Date.now(),
        });

        await newDevice.save();

        res.status(201).json({ success: true, newDevice, message: "Device Added Successfully" });
    } catch (error) {
        console.error("Error in postDevice:", error);
        console.error("Error Details:", error.message, error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCouncilPostedDevices = async (req, res) => {
    try {
        const councilId = req.council._id;
        const devices = await Device.find({ councilId });

        const devicesData = await Promise.all(devices.map(async (device) => {
            const applications = await DeviceApplication.find({ deviceId: device._id });
            return{...device.toObject(), applications: applications.length};
        }));

        res.status(200).json({ success: true, devicesData });
    } catch (error) {
        console.error("Error in getCouncilPostedDevices:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changeDeviceVisibility = async (req, res) => {
    try {
        const { id } = req.body;
        const councilId = req.council._id;

        const device = await Device.findById(id);

        if (councilId.toString() === device.councilId.toString()) {
            device.visible = !device.visible;
            await device.save();
            res.status(200).json({ success: true, device });
        } else {
            res.status(403).json({ success: false, message: "Unauthorized" });
        }
    } catch (error) {
        console.error("Error in changeDeviceVisibility:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDeviceApplicants = async (req, res) => {
    try {
        const councilId = req.council._id;
        
        const applications = await DeviceApplication.find({ councilId })
            .populate({
                path: 'userId',
                select: 'name image return_form mm_no jobDepartment location'
            })
            .populate({
                path: 'deviceId',
                select: 'title type SN location department mm_no'
            })
            .exec();

        return res.status(200).json({ 
            success: true, 
            applicants: applications 
        });
    } catch (error) {
        console.error("Error in getDeviceApplicants:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const changeDeviceApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const councilId = req.council._id;

        const application = await DeviceApplication.findOne({ 
            _id: id, 
            councilId 
        });

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ 
            success: true, 
            message: "Application status updated successfully",
            application
        });
    } catch (error) {
        console.error("Error in changeDeviceApplicationStatus:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const councilId = req.council._id;

        const device = await Device.findOne({ _id: id, councilId });
        
        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found or unauthorized"
            });
        }

        await Device.deleteOne({ _id: id });
        res.json({ success: true, message: "Device deleted successfully" });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};