const { User, Item } = require("../Mongoose/models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const salt = 8;
var jwt = require('jsonwebtoken');
var { ACCESS_TOKEN } = require('../Access_Token');
var adminEmail = require("./EmailFunctions");

/**
 * 
 * @param {String} email --- check to see if the email is alredy used in the DB
 * @param {String} password --- hashing the password and saving it to our db
 * @param {String} FirstName --- user's first name
 * @param {String} LastName --- user's lastName
 */

var SignUp = async (email, password, FirstName, LastName) => {
    if (password.length < 6) throw new Error("The Password is too short");
    const bcryptSalt = await bcrypt.genSalt(salt);
    const hashed = await bcrypt.hash(password, bcryptSalt);
    await User.create({ email: email, password: hashed, FirstName, LastName });
};


/**
 * 
 * @param {String} email --- for Finding the user  
 * @param {String} password -- comapring the hashes to make sure user is authenticated 
 */

var Login = async (email, password) => {
    const user = await User.findOne({ email: email });
    let hashPass = await user.password;
    let result = await bcrypt.compare(password, hashPass);

    return new Promise(async (res, rej) => {
        if (result) {
            let token = jwt.sign({ username: email, password, Name: (user.FirstName + " " + user.LastName) }, ACCESS_TOKEN, {
                algorithm: 'HS256',
                expiresIn: '2h'
            });
            res(token);
        }
    });
};


/**
 * 
 * @param {String} token
 * @abstract --- makes sure that user is authenticated 
 */

var authenticate = (token) => {
    jwt.verify(token.split(" ")[1], ACCESS_TOKEN);
};


/**
 * 
 * @param {String} email --- gets the requested email to change its password and if the email is available, a code will be sent to the requested email  
 * and the account will contain a forgot password code till its redeemed. (we can set a time to remove the code but it not make any difference)
 */

var forgotPassword = async (email) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("no such a user");
    let randomCode = crypto.randomBytes(3).toString("hex");
    let info = await (await adminEmail()).sendMail({
        from: "amir",
        to: user.email,
        subject: "reset Password",
        text: `your code is ${randomCode} `
    });
    user.forgotPassword = randomCode;
    await user.save();
};


/**
 * 
 * @param {String} email --- the email of the user that the password should be changed 
 * @param {String} password --- new password that will be hashed and saved in the DB 
 */

var updatePassword = async (token) => {
    let object = TokenDecoder(token);
    const user = await User.findOne({ email: email });
    let newgenSalt = await bcrypt.genSalt(salt);
    let hashedPass = await bcrypt.hash(password, newgenSalt);
    user.password = hashedPass;
    user.forgotPassword = "";
    await user.save();
};

var updateUserInfo = async (email = null, token, firstName = null, lastName = null) => {
    const { username, password } = TokenDecoder(token);
    const user = await User.findOne({ email: username });
    email !== null ? user.email = email : null;
    firstName !== null ? user.FirstName = firstName : null;
    lastName !== null ? user.LastName = lastName : null;
    await user.save();
    let newToken = await Login(email, password);
    return newToken;
};


var getRecentViewdItems = async (token) => {
    const { username } = TokenDecoder(token);
    const recentViewsIds = await User.findOne({ email: username }).select('viewedItems');
    const viewedItems = await Item.find({ '_id': { $in: recentViewsIds.viewedItems } });
    return viewedItems;
};

var addTorecentViews = async (token, itemObject) => {
    const { username } = TokenDecoder(token);
    const item = new Item(itemObject);
    await Item.create(item);
    await User.updateOne({ email: username }, {
        $addToSet: { viewedItems: item }
    });
};


var addToWishList = async (token, itemObject) => {
    const { username } = TokenDecoder(token);
    const item = new Item(itemObject);
    await Item.create(item);
    await User.updateOne({ email: username }, {
        $addToSet: { WishListItems: item }
    });
};

var getWishListItems = async (token) => {
    const { username } = TokenDecoder(token);
    const wishListIds = await User.findOne({ email: username }).select('WishListItems');
    const wishedItems = await Item.find({ '_id': { $in: wishListIds.WishListItems } });
    return wishedItems;
};

var getUserDetails = (token) => {
    const userDetails = TokenDecoder(token);
    delete userDetails.password;
    return userDetails;
};

var TokenDecoder = token => {
    const object = jwt.verify(token.split(" ")[1], ACCESS_TOKEN);
    return object;
};

module.exports = {
    SignUp,
    Login,
    forgotPassword,
    updatePassword,
    addTorecentViews,
    getRecentViewdItems,
    addToWishList,
    getWishListItems,
    updateUserInfo,
    authenticate,
    TokenDecoder,
    getUserDetails
};



