const mongoose = require('mongoose');
const Books = mongoose.Schema({
    id:{
        type:Number,
        required:true 
    },
    title:{
        type:String,
        required:true 
    },
    banner:{
        type:String,
        required:true 
    },
    file:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true 
    },
    available:{
        type:Boolean,
        required:false,
        default:true
    }
},{collection:'books'});
const model = mongoose.model('Books-model',Books);
module.exports = model;