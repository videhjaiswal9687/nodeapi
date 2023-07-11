var adminmodal = require('../modal/adminmodal')

function admincontroller() {
    this.fetchallusers = () => {
        return new Promise((resolve, reject) => {
            adminmodal.fetchusers({})
                .then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
    this.manageuserstatus = (urlObj) => {
        return new Promise((resolve, reject) => {
            adminmodal.manageuserstatusmodal(urlObj)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }
    this.updateuser=(userdetails,imgPath)=>{
        return new Promise((resolve, reject) => {
          adminmodal.fetchusers({})
          .then((result)=>{
             var data = result
             var getId = 0
             for (const user of data) {
                if (user.email == userdetails.email) {
                    getId = user._id
                    break
                }
             }
             userdetails = {...userdetails,_id:getId,status:1,role:'user',info:Date(),profileimage:'http://localhost:3000/'+imgPath}
             adminmodal.userupdatemodal(userdetails)
             .then((result)=>{
                resolve(result)
             })
             .catch((error)=>{
                reject(error)
             })
          })
        })
    }
    this.addcategory=(catdetails,imgpath)=>{
        return new Promise((resolve, reject) => {
          adminmodal.fetchcategory({})
          .then((result)=>{
            //logic
            var len = result.length
            var id = len == 0 ? 1 : result[len - 1]._id + 1
            var getcatdetails = {...catdetails,_id:id,caticonname:"http://localhost:3000/"+imgpath}
            adminmodal.addcategorymodal(getcatdetails)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
        .catch((error)=>{
            reject(error)
        })
        })
        
    }
    this.addsubcategory=(subcatdetails,imgpath)=>{
        return new Promise((resolve, reject) => {
          adminmodal.fetchallsubcategory({})
          .then((result)=>{
            var len = result.length
            var id = len == 0 ? 1 : result[len-1]._id+1
            var getsubcatdetails = {...subcatdetails,_id:id,subcaticonname:"http://localhost:3000/"+imgpath}
            
            adminmodal.addsubcategorymodal(getsubcatdetails)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
          })
          .catch((error)=>{
            reject(error)
          })
        })
    }
}

module.exports = new admincontroller()