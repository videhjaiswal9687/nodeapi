var mongoose = require('mongoose')

var categoryschema = mongoose.Schema({
    _id:Number,
    catname:{
        type:String,
        required:[true,"Category Name is required"],
        lowercase:true,
        trim:true
    },
    caticonname:{
        type:String,
        required:[true,"Category Image is required"],
        trim:true
    }
});

//compile schema to model
var categoryschemamodel = mongoose.model('add_cat',categoryschema,'category')

module.exports = categoryschemamodel;