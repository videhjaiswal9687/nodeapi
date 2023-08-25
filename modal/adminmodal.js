var  registerschemamodel = require('../schema/registerschema')
require('./connection')

var categoryschemamodal = require('../schema/categoryschema')
var subcategoryschemamodal = require('../schema/subcategoryschema')

function adminmodal(){
    this.fetchusers=(conditions)=>{
        return new Promise((resolve, reject) => {
          
            //to find record from collection
            registerschemamodel.find(conditions)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        }) 
    }
    this.manageuserstatusmodal=(urlObj)=>{
        return new Promise((resolve, reject) => {
            if (urlObj.query.s == "block") 
            {
                registerschemamodel.findByIdAndUpdate(parseInt(urlObj.query.regId),{
                    $set:{
                        status:0
                    }
                },
                {
                    new:true,
                    useFindAndModify:false
                }
                )
                .then((result)=>{
                    resolve(result)
                })
                .catch((error)=>{
                    reject(error)
                })
            }
            else if (urlObj.query.s == "verify") 
            {
                registerschemamodel.findByIdAndUpdate(parseInt(urlObj.query.regId),{
                    $set:{
                        status:1
                    }
                },
                {
                    new:true,
                    useFindAndModify:false
                }
                )
                .then((result)=>{
                    resolve(result)
                })
                .catch((error)=>{
                    reject(error)
                })
            } 
            else  {
                registerschemamodel.findByIdAndDelete(parseInt(urlObj.query.regId),{
                    new:true,
                    useFindAndModify:false
                })
                .then((result)=>{
                    resolve({"msg":"User Deleted Successfully!!"})
                })
                .catch((error)=>{
                    reject({"msg":"User Deleted Successfully!!","error":error})
                })
            }
        })
        
    }
    this.userupdatemodal=(userdetails)=>{
        return new Promise((resolve, reject) => {
          registerschemamodel.findByIdAndUpdate(userdetails._id,
            {
                $set:{
                    name:userdetails.name,
                    email:userdetails.email,
                    password:userdetails.password,
                    profileimage:userdetails.profileimage,
                    mobile:userdetails.mobile,
                    city:userdetails.city,
                    address:userdetails.address,
                    gender:userdetails.gender
                }
            },
            {
                new:true,
                useFindAndModify:false
            })
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
    this.fetchcategory=(conditions)=>{
        return new Promise((resolve, reject) => {
          
            //to find record from collection
            categoryschemamodal.find(conditions)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        }) 
    }
    this.addcategorymodal=(catdetails)=>{
       return new Promise((resolve, reject) => {
        var obj = new categoryschemamodal(catdetails)
        obj.save()
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
       })
    }
    this.fetchallsubcategory=(conditions)=>{
        return new Promise((resolve, reject) => {
          
            //to find record from collection
            subcategoryschemamodal.find(conditions)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        }) 
    }
    this.addsubcategorymodal=(subcatdetails)=>{
        return new Promise((resolve, reject) => {
        var obj = new subcategoryschemamodal(subcatdetails)
        obj.save()
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
        })
    }
    this.getsingleuser = (id) =>{
        return new Promise((resolve, reject) => {
            //to find record from collection
            registerschemamodel.findById(id)
                .then((result)=>{
                    resolve(result)
                })
                .catch((error)=>{
                    reject(error)
                })
            })
    }
}

module.exports = new adminmodal()