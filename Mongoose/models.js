const mongoose = require("./DBSetup")

let User = mongoose.model("User")
let Item  = mongoose.model("Item")

module.exports={
    User,
    Item
}