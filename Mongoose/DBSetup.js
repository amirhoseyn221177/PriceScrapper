var mongoose = require("mongoose")
var chalk = require("chalk")
var url = "mongodb://localhost:27017"


mongoose.connect(url,{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, 
    autoIndex: false ,useFindAndModify:false},()=>{
        console.log(chalk.red("connected to Mongo DB"))
})

const allSchemas = ()=>{
    const User = mongoose.Schema({
        email:{type:String,require:true,unique:true},
        password:{type:String, require:true},
        FirstName:{type:String,require:true},
        LastName:{type:String,require:true},
        forgotPassword:{type:Number},
        recentlyViewed:{type:Array, require: false},
        wishlist:{type:Array, require: false}
    })

    mongoose.model("User",User)
}



allSchemas()




module.exports = mongoose