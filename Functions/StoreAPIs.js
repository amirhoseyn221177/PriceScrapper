const amazonScraper = require('amazon-buddy');
const Ebay = require("ebay-node-api");
const StockX = require("stockx-api")

let ebay = new Ebay({
    clientID: "SatyakHa-Web-PRD-716b1f9e8-c247be31",
    clientSecret: "PRD-16b1f9e8c971-b22c-4866-9dad-2bc4",
    countryCode: 'EBAY-ENCA',
    body: {
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
    },

});
let stock = new StockX()


var AmazonResult = async (searchParam, country = null, startPoint) => {
    const products = await amazonScraper.products({ keyword: searchParam, country: country ? country : "CA" }); //default country is Canada
    return { result: products.result.splice(startPoint,3), totalLength: products.result.length };
};


var EbayResult = async (searchText,startPoint) => {
    let product = await ebay.findItemsByKeywords({ keywords: searchText });
    console.log(product[0].searchResult[0].item.splice(1,1))
    return { result: product[0].searchResult[0].item.splice(startPoint,3), totalLength: product[0].searchResult[0].count };
};


var StockXResult = async (searchQuery,startPoint) => {
            // await stock.login({
        //     user:"abdullah2211772211@gmail.com",
        //     password:"Sex221177"
        // })
    const product = await stock.newSearchProducts(searchQuery, { limit: 20 });
    return { result: product.splice(startPoint,3), totalLength: product.length };

};





module.exports = {
    AmazonResult,
    EbayResult,
    StockXResult
};