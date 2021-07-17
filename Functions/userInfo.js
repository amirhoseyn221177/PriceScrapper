const User = require("../Mongoose/models").User
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const salt = 8
const chalk= require("chalk")
var jwt = require('jsonwebtoken')
var {ACCESS_TOKEN} = require('../Access_Token')
var adminEmail = require("./EmailFunctions")
const nodemailer = require("nodemailer")

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
        await User.create({email:email,password:hashed,FirstName,LastName})
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
        }else{
            throw new Error(" wrong password")
        }
    }else{
        throw new Error(" no such a user")
    }

}



/**
 * 
 * @param {String} email --- gets the requested email to change its password and if the email is available, a code will be sent to the requested email  
 * and the account will contain a forgot password code till its redeemed. (we can set a time to remove the code but it not make any difference)
 */
var forgotPassword = async(email)=>{
    const user = await User.findOne({email:email})
    console.log(user)
    if(!user) throw new Error("no such a user")
    let randomCode = crypto.randomBytes(3).toString("hex")
    let info =  await(await adminEmail()).sendMail({
        from:"amir",
        to:user.email,
        subject:"reset Password",
        text:`your code is ${randomCode} `

    })
    user.forgotPassword = randomCode
    await user.save();
    console.log(info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }


    /**
     * 
     * @param {String} email --- the email of the user that the password should be changed 
     * @param {String} password --- new password that will be hashed and saved in the DB 
     */
    var updatePassword=async(email,password)=>{
        console.log(87)
        const user = await User.findOne({email:email})
        let newgenSalt = await bcrypt.genSalt(salt)
        let hashedPass = await bcrypt.hash(password,newgenSalt)
        user.password =hashedPass
        user.forgotPassword =""
        await user.save()
    }


    // User.findOne({email:"amirsayuar221177@gmail.com"})
    // .then(user=>{
    //     console.log(user)
    // })



    // var getAllTheUsers = async()=>{
    //     let allusers = await User.find({})
    //     console.log(allusers)
    // }


    // var deleteAllUsers = async()=>{
    //     await User.deleteMany({})
    // }


    // // getAllTheUsers() 
    // deleteAllUsers()


module.exports={
    SignUp,
    Login,
    forgotPassword,
    updatePassword
}



