import React, { Fragment, useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
import Searchbar from '../Searchbar/Searchbar';
const ProductTable = (props) => {

    var [ebayArray, setEbayArray] = useState([]);
    var [stockXArray, setStockXArray] = useState([]);
    var [amazonArray, setAmazonArray] = useState([]);

    var [productInfoArray, setproductInfoArray] = useState([]);
    var [productCardsJSX, setproductCardsJSX] = useState([]);



    var setProductsArray = (ebayArrayFromAPI, stockXArrayFromAPI, amazonArrayFromAPI) => {
        try {
            setEbayArray(ebayArrayFromAPI);
            setStockXArray(stockXArrayFromAPI);
            setAmazonArray(amazonArrayFromAPI);
            // console.log("ebay array is: ", ebayArray)
            // console.log("ebay array length from setter", ebayArray.length )
        } catch (e) {
            console.log(e)
        }
    }

    var loadProductCards = () => {
        // console.log("has waited for previous")
        let currProductsArray = [];
        // console.log("length", ebayArray.length)
        for (let i = 0; i < ebayArray.length; i++) {
            console.log(ebayArray[i])
            let title = ebayArray[i].title[0];
            let vendor = "Ebay";
            let price = ebayArray[i].sellingStatus[0].convertedCurrentPrice[0].__value__
            let currency = ebayArray[i].sellingStatus[0].convertedCurrentPrice[0]["@currencyId"]
            let image;
            if (ebayArray[i].galleryURL != null) {
                image = ebayArray[i].galleryURL[0]
            } else {
                image = ""
            }

            let ebayObject = {title, vendor, price, currency, image};
            currProductsArray.push(ebayObject)
        }

        for (let i = 0; i < stockXArray.length; i++) {
            let title = stockXArray[i].name;
            let vendor = "StockX";
            let price = stockXArray[i].price;
            let currency = "USD";
            let image = stockXArray[i].thumbnail_url;

            let stockXObject = {title, vendor, price, currency, image};
            currProductsArray.push(stockXObject);

        }

        for (let i = 0; i < amazonArray.length; i++) {
            console.log("Amazon product", amazonArray[i])
            let title = amazonArray[i].title;
            let vendor = "Amazon";
            let price = amazonArray[i].price.current_price;
            let currency = amazonArray[i].price.currency;
            let image = amazonArray[i].thumbnail;

            let amazonObject = {title, vendor, price, currency, image};
            currProductsArray.push(amazonObject);

        }
        setproductInfoArray(currProductsArray) 
    }

    var createProductCards = () => {
        let allCards = []
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
                            cardTitle={productInfoArray[i-1].title}
                            vendor={productInfoArray[i-1].vendor}
                            price={productInfoArray[i-1].price}
                            currency={productInfoArray[i-1].currency}
                            image={productInfoArray[i-1].image}
                        />
                    </td>
                    <td>
                        <ProductCard 
                            cardTitle={productInfoArray[i-2].title}
                            vendor={productInfoArray[i-2].vendor}
                            price={productInfoArray[i-2].price}
                            currency={productInfoArray[i-2].currency}
                            image={productInfoArray[i-2].image}
                        />
                    </td>
                </tr>
            );
        }
        setproductCardsJSX(allCards)
    }

    useEffect(loadProductCards, [ebayArray, stockXArray, amazonArray]);
    useEffect(createProductCards, [productInfoArray]);

    return (
        <Fragment>
            <Searchbar setProductsArray={setProductsArray}/>
            <Table className="productTable">
                <tbody>
                    {productCardsJSX}
                </tbody>
            </Table>
        </Fragment>

    );
};

export default ProductTable;
