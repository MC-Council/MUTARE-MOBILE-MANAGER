import  device from "../models/device.js";
import mongoose from "mongoose";


//Get all devices

export const getDevices = async (req, res) => {

    try {

        const devices = await device.find({ visible:true })
        .populate({path: 'councilId', select: '-password'})

        res.json({success:true, devices})
        

    } catch (error) {
        res.json({success:false, message:error.message})    
    }

}


// Get a single Job by ID

export const getDevicesById = async (req, res) =>{

    try {

        const {id} = req.params

        const device = await device.findById(id)
        .populate({path: 'councilId', select: '-password'})

        if(!device){

            return res.json({
                success:false, 
                message:"Device not found"
                })

        }
        res.json({
            success:true,
            device
        }) 
         
        

    } catch (error) {
        
        res.json({success:false,message:error.message})
    }

}