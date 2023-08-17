var express = require('express');
var url = require('url')
var router = express.Router();
var admincontroller = require('../controller/admincontroller')
var imgupload = require('../modal/imgupload')
var imgcatgeory = require('../modal/imgcategory')
var imgsubcategory = require('../modal/imgsubcategory')
var cloudinary = require('cloudinary')

router.get('/users', (req, res) => {
    admincontroller.fetchallusers()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.get('/manageuserstatus', (req, res) => {
    var urlObj = url.parse(req.url, true)
    console.log(urlObj.query)
    admincontroller.manageuserstatus(urlObj)
        .then((result) => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })

})
//http://localhost:3000/manageuserstatus?s=block&regId=1

router.put('/updateuser', imgupload.single('profileimage'), (req, res) => {
    console.log(req.body)
    console.log("Image Path=>", req.file.path)

    var imgURL
  cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Result:", result)
      imgURL = result.url
      admincontroller.updateuser(req.body, imgURL)
      .then((result) => {
          res.json({ "msg": "User Profile Updated  Successfully !!!", "record": result })
      })
      .catch((error) => {
          res.json({ "msg": "User Profile Not Updated!!!", "error": error })
      })
    }
  })




    
})


router.post('/addcategory', imgcatgeory.single('caticonname'), (req, res) => {
    console.log(req.body)
    console.log("Cat Image Path=>", req.file.path)
    admincontroller.addcategory(req.body,req.file.path)
    .then((result)=>{
        res.json({"msg":"Added Category Successfully!!","category":result})
    })
    .catch((error)=>{
        res.json({"msg":"Not Added Category!","error":error})
    })
})

router.post('/addsubcategory', imgsubcategory.single('subcaticonname'), (req, res) => {
    console.log(req.body)
    console.log("Sub Cat Image Path=>", req.file.path)
    admincontroller.addsubcategory(req.body,req.file.path)
    .then((result)=>{
        res.json({"msg":"Sub Category Added  Successfully!!","category":result})
    })
    .catch((error)=>{
        res.json({"msg":"Sub Category Not Added!","error":error})
    })
})


module.exports = router