var db = require('../config/connection')
var bcrypt = require('bcrypt')
const { response } = require('../app')
var collection = require('../config/collections')
const { ObjectID } = require('bson')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })
     
    },
    dosignin:(userData)=>{
        let loginStatus=false
        let response={}
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success');
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed');
                        resolve({status:false})
                    }
                })
            }else{
                
                resolve({status:false})
            }
        })
    },
    displayusers:()=>{
        return new Promise(async(resolve,reject)=>{
            let allusers =await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(allusers)
        })
    },
    displayuser:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectID(id)})
            resolve(user)
        })
    },
    updateUser:(id,userdata)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectID(id)},
            {$set:{
             name:userdata.name,
             email:userdata.email
            }}).then(()=>{
                resolve()
            })
        })
    },
    deleteUser:(deleteid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectID(deleteid)}).then(()=>{
                resolve()
            })
        })
    }
}