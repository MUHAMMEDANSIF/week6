var express = require('express');
const { response } = require('../app');
var router = express.Router();
var userHelper = require('../helper/user-helper')



/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.userlogin){
      res.redirect('/home')
    }else if(req.session.adminlogin){
       res.redirect('/admin')
    }else{
    var loginerr=req.session.loginerr
    res.render('signin',{loginerr})
    loginerr=false
  }
 
});



router.post('/signin',(req,res)=>{
  userHelper.dosignin(req.body).then((response)=>{
    var adminemil = 'admin@gmail.com'
    var adminpassword = 1234;
    if(response.status){
     //  req.session.loggedIn=true
       req.session.userlogin=response.user
       res.redirect('/home')
    }else if(req.body.email === adminemil && req.body.password == adminpassword){
      req.session.adminlogin=adminemil
      res.redirect('/admin')
    }else{
      req.session.loginerr=true
      res.redirect('back')
    }
  })
})

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/')
})
module.exports = router;