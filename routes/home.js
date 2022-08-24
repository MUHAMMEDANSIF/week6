var express = require('express');
const productHelper = require('../helper/product-helper');
var userHelper = require('../helper/user-helper')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getproduct().then((product)=>{
    console.log(product);
    console.log(product.mobile)
    res.render('index',{product});
  })
  
});

router.get('/addtocart/:id',(req,res)=>{
  console.log('add cart button cliked');
  console.log(req.params.id);
  productHelper.addcart(req.params.id).then((data)=>{

    res.redirect('back')
  })
 })
 
router.get('/cart',(req,res)=>{
  productHelper.showcart().then((cart)=>{
   console.log(cart);
    res.render('user/cart',{cart})
  })
})

router.get('/delete-product-cart/:id',(req,res)=>{
productHelper.deletecart(req.params.id).then(()=>{
 res.redirect('back')
})

})

router.get('/bynow/:id',(req,res)=>{
  res.render('user/placeorder')
})

router.post('/placeorder',(req,res)=>{
  productHelper.addorder(req.body).then(()=>{
    res.redirect('back')
  })
})

router.get('/orders',(req,res)=>{
   productHelper.showorder().then((order)=>{
    res.render('user/order',{order})
   })
})


module.exports = router;
