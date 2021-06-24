const route = require("express").Router();
let Ebay = require("ebay-node-api");
const chalk = require("chalk");

let ebay = new Ebay({
    clientID: "SatyakHa-Web-PRD-716b1f9e8-c247be31",
    clientSecret: "PRD-16b1f9e8c971-b22c-4866-9dad-2bc4",
    body: {
      grant_type: "client_credentials",
      //you may need to define the oauth scope
      scope: "https://api.ebay.com/oauth/api_scope",
    },
  });

//   (async()=>{
//      const data = await ebay.getAccessToken()
//      console.log(data)
//   })()

route.post("/search", async (req, res) => {
    try {
        let {searchText ,limit} = await req.body
        let product =  await ebay.findItemsByKeywords({
            keywords : searchText,
            limit
        })
        res.status(200).json({result : product[0].searchResult})
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});



module.exports = route