const nodemailer = require("nodemailer")

var AdminEmail = async()=>{
    let adminAccount = await nodemailer.createTestAccount()
    let trans =  nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        secure:false,
        auth:{
            user:adminAccount.user,
            pass:adminAccount.pass
        }
    })

    return trans
}



module.exports=AdminEmail