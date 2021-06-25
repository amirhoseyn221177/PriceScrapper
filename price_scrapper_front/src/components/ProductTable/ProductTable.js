import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Table } from 'react-bootstrap';
import { List, ListItemText, ListItem, Menu, MenuItem } from '@material-ui/core';
import { Button, Dialog, FormControlLabel, IconButton, Checkbox, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ProductCard from '../ProductCard/ProductCard';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import './ProductTable.css';

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [open, setOpen] = useState(false);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    const handleShow = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const options = [
        'Highest Rating',
        'Lowest Rating',
        'Highest Price',
        'Lowest Price'
    ];

    const categories = ["Clothing", "Shoes", "Computers", "Cars"]


    var callAmazonAPI = async () => {
        try {
            var amazonResponse = await axios.post("/api/amazon/search", { searchText });
            const amazonJSON = await amazonResponse.data;
            const amazonItemArr = await amazonJSON.result;
            setAmazonArray(amazonItemArr)
        } catch (e) {
            console.log(e);

        }

    }


    var callEbayAPI = async () => {
        try {
            var ebayResponse = await axios.post("/api/ebay/search", { searchText });
            const ebayJSON = await ebayResponse.data;
            const ebayItemArr = await ebayJSON.result[0].item;
            setEbayArray(ebayItemArr)
        } catch (e) {
            console.log(e);

        }

    }


    var callStockxAPI = async () => {
        try {
            var stockxResponse = await axios.post("/api/stockx/search", { searchText });
            const stockxJSON = await stockxResponse.data;
            const stockxItemArr = await stockxJSON.result;
            setStockXArray(stockxItemArr)
        } catch (e) {
            console.log(e)
        }

    }


    useEffect(async () => {
        console.log(91)
        await callAmazonAPI()
        await callStockxAPI()
        await callEbayAPI()
    }, [])





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

        for (let i = 0; i < stockXArray.length; i++) {
            let title = stockXArray[i].name;
            let vendor = "StockX";
            let price = stockXArray[i].price;
            let currency = "USD";
            let image = stockXArray[i].thumbnail_url;

            let stockXObject = { title, vendor, price, currency, image };
            currProductsArray.push(stockXObject);

        }

        for (let i = 0; i < amazonArray.length; i++) {
            console.log("Amazon product", amazonArray[i]);
            let title = amazonArray[i].title;
            let vendor = "Amazon";
            let price = amazonArray[i].price.current_price;
            let currency = amazonArray[i].price.currency;
            let image = amazonArray[i].thumbnail;

            let amazonObject = { title, vendor, price, currency, image };
            currProductsArray.push(amazonObject);

        }
        setproductInfoArray(currProductsArray);
    };


    var callAPIBundle = async () => {
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
            <div className="searchDiv">
                <SearchBar
                    className="searchBar"
                    value={searchText}
                    onChange={newValue => setSearchText(newValue)}
                    onRequestSearch={() => callAPIBundle()}
                />
                <Button
                    className="filterButton"
                    variant="contained"
                    color="primary"
                    onClick={handleShow}
                >
                    Filter
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle className="dialogTitle" disableTypography>
                        <h2>Filter by category</h2>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers className="dialogContent">
                        <div>
                            {categories.map(
                                (category, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            }
                                            label={category}
                                        />
                                    )
                                })}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Table className="productTable">
                <thead>
                    <tr>
                        <th colSpan='3'>
                            <List component="nav" aria-label="Device settings">
                                <ListItem
                                    button
                                    aria-haspopup="true"
                                    aria-controls="lock-menu"
                                    aria-label="Sort By:"
                                    onClick={handleClickListItem}
                                >
                                    <ListItemText primary={"Sort by: " + options[selectedIndex]} />
                                </ListItem>
                            </List>
                            <Menu
                                id="lock-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseSort}
                            >
                                {options.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productCardsJSX}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default ProductTable;

