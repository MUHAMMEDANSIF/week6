module.exports={
    addproduct:(user,callback)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).insertOne(user).then((data)=>{
            callback(true)
        })
    }
}