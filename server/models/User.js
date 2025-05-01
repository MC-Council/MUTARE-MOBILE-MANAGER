import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    return_form: {
        data: Buffer,
        contentType: String,
        filename: String,  // Added filename field
        uploadedAt: Date    // Added uploadedAt field
    },
    image: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;