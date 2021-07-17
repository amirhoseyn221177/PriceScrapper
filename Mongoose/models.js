const mongoose = require("./DBSetup")

let User = mongoose.model("User")
let mostPopularItems  = mongoose.model("mostPopularItems")

module.exports={
    User,
    mostPopularItems
}