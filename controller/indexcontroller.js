var indexmodal = require('../modal/indexmodal')

function indexcontroller() {
    this.userregister = (userdetails,imgpath) => {
        return new Promise((resolve, reject) => {
            indexmodal.fetchusers({})
                .then((result) => {
                    //logic
                    var len = result.length
                    var _id = len == 0 ? 1 : result[len - 1]._id + 1
                    userdetails = {
                        ...userdetails,
                        _id: _id,
                        status: 0,
                        role:'user',
                        info: Date(),
                        profileimage:"http://localhost:3000/"+imgpath
                    }
                    indexmodal.userregistermodal(userdetails)
                    .then((result)=>{
                        resolve(result)
                    })
                    .catch((error)=>{
                        reject(error)
                    })
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
    this.userlogin=(userdetails)=>{
        return new Promise((resolve, reject) => {
            var getuserdetail={...userdetails,status:1}
            console.log(getuserdetail)
            indexmodal.fetchusers(getuserdetail)
            .then((result)=>{
                const responseCode = result.length == 0 ? 0 : (result[0].role == "admin" ? 1 : 2)
                resolve({"responseCode":responseCode,"userDetails":result[0]})     
            })
            .catch((error)=>{
                reject(error)
            })
        })  
    }
}

module.exports = new indexcontroller()