var mongoose = require('mongoose')

var registerschema = mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        required:[true,"Name is required"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        maxlength:10,
        minlenght:5,
        trim:true
    },
    profileimage:{
        type:String,
        required:[true,"Profile Image  is required"],
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"Mobile is required"],
        maxlength:10,
        minlenght:10,
        trim:true
    },
    city:{
        type:String,
        required:[true,"City is required"],
        trim:true
    },
    address:{
        type:String,
        required:[true,"Address is required"],
        trim:true
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
    },
    role:String,
    status:Number,
    info:String,
});

//compile schema to model
var registerschemamodel = mongoose.model('reg_user',registerschema,'register')

module.exports = registerschemamodel;