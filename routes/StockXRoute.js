const chalk = require("chalk");
const { response } = require("express");
const { StockXResult } = require("../Functions/StoreAPIs");
const route = require("express").Router()


route.post("/search",async(req,res)=>{
    try{
        let searchQuery = req.body.searchText
        let startPoint = req.body.startPoint
        console.log(req.body)
        const respond = await StockXResult(searchQuery,startPoint)
        res.status(200).json(respond)
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