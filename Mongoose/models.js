const mongoose = require("./DBSetup")

let User = mongoose.model("User")
let Item  = mongoose.model("Item")
let Review  = mongoose.model("Review")
let Rating  = mongoose.model("Rating")


module.exports={
    User,
    Item,
    Review,
    Rating
}