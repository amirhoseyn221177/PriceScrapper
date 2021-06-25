const StockX = require("stockx-api")
const chalk = require("chalk")
const route = require("express").Router()
let stock = new StockX()


route.post("/search",async(req,res)=>{
    try{
        let searchQuery = req.body.searchText
        // await stock.login({
        //     user:"abdullah2211772211@gmail.com",
        //     password:"Sex221177"
        // })
        const product = await stock.newSearchProducts(searchQuery,{limit:20})
        res.status(200).json({result:product})
    }catch(e){
        console.log(chalk.red(e.message))
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
  
})



module.exports = route