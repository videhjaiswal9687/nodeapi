var mongoose = require('mongoose')

var subcategoryschema = mongoose.Schema({
    _id:Number,
    catname:{
        type:String,
        required:[true,"Category Name is required"],
        lowercase:true,
        trim:true
    },
    subcatname:{
        type:String,
        required:[true,"Sub Category Name is required"],
        lowercase:true,
        trim:true
    },
    subcaticonname:{
        type:String,
        required:[true,"Sub Category Image is required"],
        trim:true
    }
});

//compile schema to model
var subcategoryschemamodel = mongoose.model('add_sub_cat',subcategoryschema,'subcategory')

module.exports = subcategoryschemamodel;