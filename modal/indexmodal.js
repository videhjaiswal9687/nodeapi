var registerschemamodel = require('../schema/registerschema')
require('./connection')

function indexmodal(){

    this.userregistermodal=(userdetails)=>{
        return new Promise((resolve, reject) => {
          
            // a document instance
            var obj = new registerschemamodel(userdetails)

            //save model to database
            obj.save()
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }

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
}

module.exports = new indexmodal()
