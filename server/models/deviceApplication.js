import mongoose from 'mongoose';


const DeviceApplicationSchema = new mongoose.Schema({ 
    userId: { type : String, ref:'User', required: true },
    councilId: {type : mongoose.Schema.Types.ObjectId, ref:'Council', required: true }, 
    deviceId: {type : mongoose.Schema.Types.ObjectId, ref:'Device', required: true }, 
    status: {type:String, default:'Pending'},
    date: { type:Number, required: true}
});

const DeviceApplication = mongoose.model('DeviceApplication', DeviceApplicationSchema)

export default DeviceApplication