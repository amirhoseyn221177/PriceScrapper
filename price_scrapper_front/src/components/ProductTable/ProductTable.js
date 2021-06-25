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
            if (item.galleryURL != null) {
                image = await item.galleryURL[0];
            } else {
                image = "";
            }

            let ebayObject = { title, vendor, price, currency, image };
            currProductsArray.push(ebayObject);
        });

        stockXArray.map (async(item)=> {
            let title = await item.name;
            let vendor = "StockX";
            let price = await item.price;
            let currency = "USD";
            let image = await item.thumbnail_url;

            let stockXObject = { title, vendor, price, currency, image };
            currProductsArray.push(stockXObject);
        
        })

        amazonArray.map (async(item)=> {
            let title = await item.title;
            let vendor = "Amazon";
            let price = await item.price.current_price;
            let currency = await item.price.currency;
            let image = await item.thumbnail;

            let amazonObject = { title, vendor, price, currency, image };
            currProductsArray.push(amazonObject);

        })
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
                        />
                    </td>
                    <td>
                        <ProductCard
                            cardTitle={productInfoArray[i - 1].title}
                            vendor={productInfoArray[i - 1].vendor}
                            price={productInfoArray[i - 1].price}
                            currency={productInfoArray[i - 1].currency}
                            image={productInfoArray[i - 1].image}
                        />
                    </td>
                    <td>
                        <ProductCard
                            cardTitle={productInfoArray[i - 2].title}
                            vendor={productInfoArray[i - 2].vendor}
                            price={productInfoArray[i - 2].price}
                            currency={productInfoArray[i - 2].currency}
                            image={productInfoArray[i - 2].image}
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
            className="searchBar"
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
