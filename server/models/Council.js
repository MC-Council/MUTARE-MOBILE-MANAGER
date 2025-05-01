import mongoose from 'mongoose';

const councilSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    


});

export const Council = mongoose.model('Council', councilSchema)