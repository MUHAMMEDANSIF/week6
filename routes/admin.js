var express = require('express');
var router = express.Router();
var handlebars = require('handlebars');
var productHelper = require('../helper/product-helper')
var userHelper = require('../helper/user-helper')

handlebars.registerHelper("inc",(value,options)=>{
  return parseInt(value) + 1; 
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getproduct().then((product)=>{
    res.render('admin/all-product',{product})
  })
});

router.get('/add-product', function(req, res, next) {
  res.render('admin/addproduct')
});

router.post('/add-product',function(req,res){
productHelper.addproduct(req.body).then((id)=>{
  let image = req.files.image
  image.mv('./public/product-image/'+id.insertedId+'.jpg',(err,data)=>{
   if(!err){
   res.redirect('back')
   }

  })
})

})


router.get('/delete-product/:id',(req,res)=>{
  var deleteid = req.params.id
  productHelper.deleteproduct(deleteid).then(()=>{
    res.redirect('back')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product =await productHelper.getProductDetiles(req.params.id)
  console.log(req.params);
  res.render('admin/edit-product',{product})
})

router.post('/edit-product/:id',(req,res)=>{
     productHelper.updateProduct(req.params.id,req.body).then(()=>{
      res.redirect('back')
      if(image){
        var image = req.files.image
        let id = req.params.id
        image.mv('./public/product-image/'+id+'.jpg')
      }
     })
})

router.post('/edit-user/:id',(req,res)=>{
  userHelper.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('back')
  })
})

router.get('/all-user', function(req, res, next) {
  userHelper.displayusers().then((users)=>{
    res.render('user/all-user',{users})
  })
});

router.get('/add-user',(req,res)=>{
  res.render('user/add-user')
})
router.post('/add-user',(req,res)=>{
  userHelper.doSignup(req.body).then((data)=>{
      res.redirect('back')
      return 'you data is added'
  })
})
 
router.get('/edit-user/:id',(req,res)=>{
  userHelper.displayuser(req.params.id).then((user)=>{
    res.render('user/edit-user',{user})
  })
})

 router.get('/delete-user/:id',(req,res)=>{
   userHelper.deleteUser(req.params.id).then(()=>{
    res.redirect('back')
   })
 })



module.exports=router;