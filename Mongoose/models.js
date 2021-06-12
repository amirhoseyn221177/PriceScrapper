const mongoose = require("./DBSetup")

let User = mongoose.model("User")


module.exports={
    User
}