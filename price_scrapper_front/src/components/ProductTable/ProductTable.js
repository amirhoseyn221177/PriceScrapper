import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
// import Searchbar from '../Searchbar/Searchbar';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
const ProductTable = (props) => {
    const [ebayArray, setEbayArray] = useState([]);
    const [stockXArray, setStockXArray] = useState([]);
    const [amazonArray, setAmazonArray] = useState([]);
    const [productInfoArray, setproductInfoArray] = useState([]);
    const [productCardsJSX, setproductCardsJSX] = useState([]);
    const [paginationEbay, setPaginationEbay] = useState({ start: 0, limit: 5 });
    const [paginationAmazon, setPaginationAmazon] = useState({ start: 0, limit: 5 });
    const [paginationStockx, setPaginationStockx] = useState({ start: 0, limit: 5 });
    const [searchText, setSearchText] = useState("iphone");





    var callAmazonAPI = async()=>{
        try{
            var amazonResponse = await axios.post("/api/amazon/search", { searchText });
            const amazonJSON = await amazonResponse.data;
            const amazonItemArr = await amazonJSON.result;
            setAmazonArray(amazonItemArr)
        }catch(e){
            console.log(e);

        }
   
    }


    var callEbayAPI = async()=>{
        try{
            var ebayResponse = await axios.post("/api/ebay/search", { searchText });
            const ebayJSON = await ebayResponse.data;
            const ebayItemArr = await ebayJSON.result[0].item;
            setEbayArray(ebayItemArr)
        }catch(e){
            console.log(e);

        }

    }


    var callStockxAPI = async()=>{
        try{
            var stockxResponse = await axios.post("/api/stockx/search", { searchText });
            const stockxJSON = await stockxResponse.data;
            const stockxItemArr = await stockxJSON.result;
            setStockXArray(stockxItemArr)
        }catch(e){
            console.log(e)
        }

    }


    useEffect(async()=>{
        console.log(91)
        await callAmazonAPI()
        await callStockxAPI()
        await callEbayAPI()
    },[])





    var loadProductCards = async () => {
        let currProductsArray = [];
        ebayArray.map(async (item, i) => {
            console.log(item);
            let title = await item.title[0];
            let vendor = "Ebay";
            let price = await item.sellingStatus[0].convertedCurrentPrice[0].__value__;
            let currency = await item.sellingStatus[0].convertedCurrentPrice[0]["@currencyId"];
            let image;
            let itemURL = ebayArray[i].viewItemURL[0];
            if (item.galleryURL != null) {
                image = await item.galleryURL[0];
            } else {
                image = "";
            }

            let ebayObject = {title, vendor, price, currency, image, itemURL};
            currProductsArray.push(ebayObject);
        });

        for (let i = 0; i < stockXArray.length; i++) {
            let title = stockXArray[i].name;
            let vendor = "StockX";
            let price = stockXArray[i].price;
            let currency = "USD";
            let image = stockXArray[i].thumbnail_url;
            let itemURL = stockXArray[i].url;

            let stockXObject = {title, vendor, price, currency, image, itemURL};
            currProductsArray.push(stockXObject);

        }

        for (let i = 0; i < amazonArray.length; i++) {
            console.log("Amazon product", amazonArray[i]);
            let title = amazonArray[i].title;
            let vendor = "Amazon";
            let price = amazonArray[i].price.current_price;
            let currency = amazonArray[i].price.currency;
            let image = amazonArray[i].thumbnail;
            let itemURL = amazonArray[i].url;

            let amazonObject = {title, vendor, price, currency, image, itemURL};
            currProductsArray.push(amazonObject);

        }
        setproductInfoArray(currProductsArray);
    };


    var callAPIBundle=async()=>{
        await callEbayAPI()
        await callAmazonAPI()
        await callStockxAPI()
    }

    var createProductCards = () => {
        let allCards = [];
        for (let i = 2; i < productInfoArray.length; i += 3) {
            allCards.push(
                <tr>
                    <td>
                        <ProductCard
                            cardTitle={productInfoArray[i].title}
                            vendor={productInfoArray[i].vendor}
                            price={productInfoArray[i].price}
                            currency={productInfoArray[i].currency}
                            image={productInfoArray[i].image}
                            itemURL = {productInfoArray[i].itemURL}
                        />
                    </td>
                    <td>
                        <ProductCard
                            cardTitle={productInfoArray[i - 1].title}
                            vendor={productInfoArray[i - 1].vendor}
                            price={productInfoArray[i - 1].price}
                            currency={productInfoArray[i - 1].currency}
                            image={productInfoArray[i - 1].image}
                            itemURL = {productInfoArray[i-1].itemURL}
                        />
                    </td>
                    <td>
                        <ProductCard
                            cardTitle={productInfoArray[i - 2].title}
                            vendor={productInfoArray[i - 2].vendor}
                            price={productInfoArray[i - 2].price}
                            currency={productInfoArray[i - 2].currency}
                            image={productInfoArray[i - 2].image}
                            itemURL = {productInfoArray[i-2].itemURL}
                        />
                    </td>
                </tr>
            );
        }
        setproductCardsJSX(allCards);
    };

    useMemo(async () => {
        await loadProductCards();
    }, [ebayArray, stockXArray, amazonArray]);
    useEffect(createProductCards, [productInfoArray]);

    return (
        <Fragment>
            <SearchBar
                id="Search-Bar"
                value={searchText}
                onChange={newValue => setSearchText(newValue)}
                onRequestSearch={() => callAPIBundle()}
            />            <Table className="productTable">
                <tbody>
                    {productCardsJSX}
                </tbody>
            </Table>
        </Fragment>

    );
};

export default ProductTable;
