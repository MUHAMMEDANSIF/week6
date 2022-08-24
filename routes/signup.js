var express = require('express');
const { rawListeners } = require('../app');
var router = express.Router();
var productHelper = require('../helper/product-helper');
const userHelper = require('../helper/user-helper');


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('signup')
});

router.post('/',function(req,res){
  userHelper.doSignup(req.body).then((data)=>{
    res.redirect('/')
  })
})

module.exports = router;