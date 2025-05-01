import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mm_no: {type: String, required: true},
    corporate_email: {type: String, required: true},
    title: {type: String, required: true},
    SN: {type: String, required: true},
    type: {type: String, required: true},
    storage: {type: String, required: true},
    memory: {type: String, required: true},
    department: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Number, required: true},
    visible: {type: Boolean, default: true},
    councilId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Council',
      required: true
    },
});

export default mongoose.models?.Device || mongoose.model("Device", deviceSchema);