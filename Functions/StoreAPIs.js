const amazonScraper = require('amazon-buddy');
const Ebay = require("ebay-node-api");
const {Review} = require('../Mongoose/models')
let ebay = new Ebay({
    clientID: "SatyakHa-Web-PRD-716b1f9e8-c247be31",
    clientSecret: "PRD-16b1f9e8c971-b22c-4866-9dad-2bc4",
    countryCode: 'EBAY-ENCA',
    body: {
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
    },

});




var AmazonResult = async (searchParam, country = null, startPoint, sortVariable = null) => {
    const products = await amazonScraper.products({ keyword: searchParam, country: country ? country : "US" }); //default country is Canada
    console.log(startPoint);
    return { result: sortAmazonItems(sortVariable, products.result).splice((startPoint - 1) * 3, 6), totalLength: products.result.length };
};


var EbayResult = async (searchText, startPoint, sortVariable = null) => {
    console.log(startPoint);
    let product = await ebay.findItemsByKeywords({ keywords: searchText });
    return {
        result: sortEbayItems(sortVariable, product[0].searchResult[0].item).splice((startPoint - 1) * 3, 6),
        totalLength: product[0].searchResult[0].item.length
    };
};




/**
 * 
 * @param {String} sortType -- Base of the Sort  -> HR = Highest_Rate , LR = Lowest_Rate , HP = Highest_Price , LP = Lowest_Price. deafult is the Highest Rated
 * @param {*} items -- items that have to be sorted
 */
var sortAmazonItems = (sortType = null, items) => {
    console.log(sortType);
    switch (sortType) {
        case "Highest Rating":
            return items.sort((a, b) => b.reviews.rating - a.reviews.rating);
        case "Lowest Rating":
            return items.sort((a, b) => a.reviews.rating - b.reviews.rating);
        case "Highest Price":
            return items.sort((a, b) => b.price.current_price - a.price.current_price);
        case "Lowest Price":
            return items.sort((a, b) => a.price.current_price - b.price.current_price);
        default:
            return items.sort((a, b) => b.reviews.rating - a.reviews.rating);

    }
};

var sortEbayItems = (sortType = null, items) => {
    switch (sortType) {
        case "Highest Price":
            return items.sort((a, b) => b.sellingStatus[0].convertedCurrentPrice[0].__value__ - a.sellingStatus[0].convertedCurrentPrice[0].__value__);
        case "Lowest Price":
            return items.sort((a, b) => a.sellingStatus[0].convertedCurrentPrice[0].__value__ - b.sellingStatus[0].convertedCurrentPrice[0].__value__);
        case "Highest Rating":
            return items.sort((a, b) => b.sellerInfo[0].positiveFeedbackPercent[0] - a.sellerInfo[0].positiveFeedbackPercent[0]);
        case "Lowest Rating":
            return items.sort((a, b) => a.sellerInfo[0].positiveFeedbackPercent[0] - b.sellerInfo[0].positiveFeedbackPercent[0]);
        default:
            return items.sort((a, b) => b.sellingStatus[0].convertedCurrentPrice[0].__value__ - a.sellingStatus[0].convertedCurrentPrice[0].__value__);

    }

};


var findTheReviews = async(itemURL)=>{
    let resp =  await Review.find({itemURL :itemURL})
    return resp
}



module.exports = {
    AmazonResult,
    EbayResult,
    findTheReviews
};