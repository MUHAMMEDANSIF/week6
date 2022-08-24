var db = require('../config/connection')
var collection = require('../config/collections')
const ObjectId =require('mongodb').ObjectId
module.exports={
    addproduct:(user)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(user).then((data)=>{
                resolve(data)
            })
        })
    },
    getproduct:()=>{
     return new Promise(async(resolve,reject)=>{
        let product =await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
    resolve(product)
   // let id = await db.get().collection(collection.PRODUCT_COLLECTION).find()
     })
    },
    deleteproduct:(deleteid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(deleteid)}).then(()=>{
                resolve()
            })
        })
    },
    getProductDetiles:(detilesid)=>{
     return new Promise(async(resolve,reject)=>{
       var detiles = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(detilesid)})
            resolve(detiles)
     })
    },
    updateProduct:(updateid,updatedetiles)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:ObjectId(updateid)},
                {$set:
                    {
                        mobile:updatedetiles.mobile,
                        categary:updatedetiles.categary,
                        price:updatedetiles.price,
                        descrption:updatedetiles.description
                    }}).then(()=>{
                        resolve(true)
                    })
        })
    },
    addcart:(id)=>{
      return new Promise((resolve,reject)=>{
         db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((data)=>{
           db.get().collection(collection.PRODUCT_CART).insertOne({imgid:data._id,mobile:data.mobile,price:data.price,description:data.description}).then(()=>{
           })
           resolve()
         })
      })
    },
    showcart:()=>{
        return new Promise(async(resolve,reject)=>{
            var cart =await db.get().collection(collection.PRODUCT_CART).find().toArray()
            console.log(cart);
            resolve(cart)
        })
    },
    deletecart:(cartid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_CART).deleteOne({_id:ObjectId(cartid)}).then(()=>{
                resolve()
            })
        })
    },
    addorder:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_ORDER).insert(data).then(()=>{
                resolve()
            })
        })
    },
    showorder:()=>{
        return new Promise(async(resolve,reject)=>{
            var order = db.get().collection(collection.PRODUCT_ORDER).find().toArray()
            resolve(order)
        })
    }
}