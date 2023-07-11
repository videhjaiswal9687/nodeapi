var express = require('express');
var router = express.Router();

/*
Route Level Middleware:
Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router() . Load router-level middleware by using the router.use() and router.METHOD() functions.
*/

router.use('/',(req,res,next)=>{
  console.log("Access Route Level Middleware..")
  next()
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user')
});



module.exports = router;
