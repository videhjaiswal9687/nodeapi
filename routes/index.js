var express = require('express');
var router = express.Router();
var indexcontroller = require('../controller/indexcontroller')
var imgupload = require('../modal/imgupload')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/register', (req, res) => {
//   console.log(req.body)
//   indexcontroller.userregister(req.body)
//     .then((result) => {
//       res.json({ "msg": "User Register Successfully !!!", "record": result })
//     })
//     .catch((error) => {
//       res.json({ "msg": "User Not Register!!!", "error": error })
//     })
// })

// router.post('/register', imgupload.single('profileimage'),(req, res) => {
//   console.log(req.body)
//   console.log("Image Path=>",req.file.path)
//   indexcontroller.userregister(req.body,req.file.path)
//     .then((result) => {
//       res.json({ "msg": "User Register Successfully !!!", "record": result })
//     })
//     .catch((error) => {
//       res.json({ "msg": "User Not Register!!!", "error": error })
//     })
// })

router.post('/register', imgupload.single('profileimage'), (req, res) => {
  console.log(req.body)
  console.log("Image Path=>", req.file.path)
  var imgURL
  cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Result:", result)
      imgURL = result.url
      indexcontroller.userregister(req.body, imgURL)
        .then((result) => {
          res.json({ "msg": "User Register Successfully !!!", "record": result })
        })
        .catch((error) => {
          res.json({ "msg": "User Not Register!!!", "error": error })
        })
    }
  })
})

router.post('/login',(req,res)=>{
  // console.log(req.body)
  indexcontroller.userlogin(req.body)
  .then((result)=>{
    if (result["responseCode"]==2) {
       res.json({"msg":"User Login Successfully!!!","userdetails":result})
    }
    else if(result["responseCode"]==1){
      res.json({"msg":"Admin Login Successfully!!!","userdetails":result})
    }else{
      res.json({"msg":"Invalid User, Please Verfiy User"})
    }
  })
  .catch((error)=>{
    res.json({"msg":"Invalid User or Verify User, Please try again!!","error":error})
  })
})


module.exports = router;
