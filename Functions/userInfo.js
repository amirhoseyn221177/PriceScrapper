const User = require("../Mongoose/models").User
const bcrypt = require("bcrypt")
const salt = 8
const chalk= require("chalk")
var jwt = require('jsonwebtoken')
var {ACCESS_TOKEN} = require('../Access_Token')


/**
 * 
 * @param {String} email --- check to see if the email is alredy used in the DB
 * @param {String} password --- hashing the password and saving it to our db
 * @param {String} FirstName --- user's first name
 * @param {String} LastName --- user's lastName
 */
var SignUp=async(email,password,FirstName,LastName)=>{
        if (password.length<6) throw new Error("The Password is too short")
        const bcryptSalt = await bcrypt.genSalt(salt)
        const hashed = await bcrypt.hash(password,bcryptSalt)
        await User.create({email,hashed,FirstName,LastName,})
}


/**
 * 
 * @param {String} email --- for Finding the user  
 * @param {String} password -- comapring the hashes to make sure user is authenticated 
 * @returns {String} ---- returns a token if successful
 */


var Login = async(email,password)=>{
    const user = await User.findOne({email:email})
    if(user){
        let hashPass = await user.password
        let result = await bcrypt.compare(password,hashPass)
        if(result){
            let token = jwt.sign({username:email,password},ACCESS_TOKEN,{
                algorithm:'HS256',
                expiresIn:'2h'
            })
            return token
        }
    }

}






module.exports={
    SignUp,
    Login
}



