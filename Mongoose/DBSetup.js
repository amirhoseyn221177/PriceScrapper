var mongoose = require("mongoose")
var chalk = require("chalk")
var url = "mongodb+srv://cpsc455DB:Amir221177@cluster0.j4ek5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


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
        title:{type: String , require : true},
        vendor : {type : String , require : true},
        price : {type : String , require : true},
        currency : {type : String , require : true},
        category : {type : String, require :true},
        image: {type : String, require :true},
        imageURL : {type : String, require :true},
        itemStoreCode :{type : String, require : true}

    })

    mongoose.model("Item" , Item)
    mongoose.model("User",User)

}



allSchemas()




module.exports = mongoose