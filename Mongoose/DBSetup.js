var mongoose = require("mongoose")
var chalk = require("chalk")
var url = "mongodb://localhost:27017"


mongoose.connect(url,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true ,useFindAndModify:true},()=>{
        console.log(chalk.red("connected to Mongo DB"))
            // mongoose.connection.db.dropDatabase()

})

const allSchemas = ()=>{
    const User = mongoose.Schema({
        email:{type:String,require:true,unique:true},
        password:{type:String, require:true},
        FirstName:{type:String,require:true},
        LastName:{type:String,require:true},
        forgotPassword:{type:Number},
        viewedItems : [{type : mongoose.Schema.Types.ObjectId , ref:"Item"}],
        WishListItems :[{type:mongoose.Schema.Types.ObjectId, ref:"Item"}]
    })



    const Item = mongoose.Schema({
        itemName:{type: String , require : true},
        vendor : {type : String , require : true},
        price : {type : String , require : true},
        currency : {type : String , require : true},
        category : {type : String, require :true},
        image: {type : String, require :false},
        imageURL : {type : String, require :true},
        itemStoreCode :{type : String, require : true}

    })

    mongoose.model("Item" , Item)
    mongoose.model("User",User)

}



allSchemas()




module.exports = mongoose