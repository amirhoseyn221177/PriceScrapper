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
            console.log("ebay array is: ", ebayArray)
            console.log("ebay array length from setter", ebayArray.length )
        } catch (e) {
            console.log(e)
        }
    }

    var loadProductCards = () => {
        console.log("has waited for previous")
        let currProductsArray = [];
        console.log("length", ebayArray.length)
        for (let i = 0; i < ebayArray.length; i++) {
            let title = ebayArray[i].title[0];
            let vendor = "Ebay";
            let price = ebayArray[i].sellingStatus[0].convertedCurrentPrice[0].value
            let currency = ebayArray[i].sellingStatus[0].convertedCurrentPrice[0].convertedCurrentPrice
  //          let image = ebayArray[i]?.pictureURLLarge[0] ?? "";

            let ebayObject = {title, vendor, price, currency};
            console.log("object", ebayObject)

            currProductsArray.push(ebayObject)
            console.log("getting populated: ", currProductsArray)
        }
        setproductInfoArray(currProductsArray) 
    }

    var createProductCards = () => {
        let allCards = []
        for (let i = 2; i < productInfoArray.length; i += 3) {
            // <tr>
            //     <td><ProductCard /></td>
            //     <td><ProductCard /></td>
            //     <td><ProductCard /></td>
            // </tr>
            allCards.push(
                <tr>
                    <td>
                        <ProductCard 
                            title={productInfoArray[i].title}
                            vendor={productInfoArray[i].vendor}
                            price={productInfoArray[i].price}
                            currency={productInfoArray[i].currency}
                        />
                    </td>
                    <td>
                        <ProductCard 
                            title={productInfoArray[i-1].title}
                            vendor={productInfoArray[i-1].vendor}
                            price={productInfoArray[i-1].price}
                            currency={productInfoArray[i-1].currency}
                        />
                    </td>
                    <td>
                        <ProductCard 
                            title={productInfoArray[i-2].title}
                            vendor={productInfoArray[i-2].vendor}
                            price={productInfoArray[i-2].price}
                            currency={productInfoArray[i-2].currency}
                        />
                    </td>
                </tr>
            );
        }
        setproductCardsJSX(allCards)
    }

    useEffect(loadProductCards, [ebayArray]);
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
