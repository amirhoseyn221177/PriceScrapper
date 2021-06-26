import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Table } from 'react-bootstrap';
import { List, ListItemText, ListItem, Menu, MenuItem } from '@material-ui/core';
import { Button, Dialog, FormControlLabel, IconButton, Checkbox, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ProductCard from '../ProductCard/ProductCard';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import './ProductTable.css';
import Pagination from '@material-ui/lab/Pagination';
import { ChosenItem } from "../Actions/actions";
import { connect } from 'react-redux';
const options = [
    'Highest Rating',
    'Lowest Rating',
    'Highest Price',
    'Lowest Price'
];

const categories = ["Clothing", "Shoes", "Computers", "Cars"];


const ProductTable = (props) => {

    const [ebayArray, setEbayArray] = useState([]);
    const [stockXArray, setStockXArray] = useState([]);
    const [amazonArray, setAmazonArray] = useState([]);
    const [productInfoArray, setproductInfoArray] = useState([]);
    const [productCardsJSX, setproductCardsJSX] = useState([]);
    // const [paginationEbay, setPaginationEbay] = useState({ start: 0, limit: 5 });
    // const [paginationAmazon, setPaginationAmazon] = useState({ start: 0, limit: 5 });
    // const [paginationStockx, setPaginationStockx] = useState({ start: 0, limit: 5 });
    const [searchText, setSearchText] = useState("yeezy");
    const [chosenCategories, setChosenCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [CategoryToggleOption, setCategoryToggle] = useState({ Clothing: false, Shoes: false, Computers: false, Cars: false });
    const [open, setOpen] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [startPoint,setStartPoint]=useState(0)
    const [amazonNumber,setAmazonNumber]=useState(0)
    const [ebayNumber,setEbayNumber]=useState(0)
    const [stockNumber,setStockNumber]=useState(0)
    const handleClickListItem = (event) => {
        console.log(37);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        console.log(42);
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




    var callAmazonAPI = async () => {
        try {
            var amazonResponse = await axios.post("/api/amazon/search", { searchText, startPoint });
            const amazonJSON = await amazonResponse.data;
            const amazonItemArr = await amazonJSON.result;
            setAmazonNumber(amazonJSON.totalLength)
            setAmazonArray(amazonItemArr);
        } catch (e) {
            console.log(e);

        }

    };



    var callEbayAPI = async () => {
        try {
            var ebayResponse = await axios.post("/api/ebay/search", { searchText, startPoint });
            const ebayJSON = await ebayResponse.data;
            const ebayItemArr = await ebayJSON.result;
            setEbayNumber(ebayJSON.totalLength)
            setEbayArray(ebayItemArr);
            // return ebayJSON.totalLength
        } catch (e) {
            console.log(e);

        }

    };


    var callStockxAPI = async () => {
        try {
            var stockxResponse = await axios.post("/api/stockx/search", { searchText, startPoint });
            const stockxJSON = await stockxResponse.data;
            const stockxItemArr = await stockxJSON.result;
            setStockNumber(stockxJSON.totalLength)
            setStockXArray(stockxItemArr);
        } catch (e) {
            console.log(e);
        }

    };


    useEffect(async () => {
        await callAPIBundle()
    }, []);







    var loadProductCards = async () => {
        let currProductsArray = [];
        ebayArray.map(async (item, i) => {
            let title = await item.title[0];
            let vendor = "Ebay";
            let price = await item.sellingStatus[0].convertedCurrentPrice[0].__value__;
            let currency = await item.sellingStatus[0].convertedCurrentPrice[0]["@currencyId"];
            let image;
            let itemURL = await item.viewItemURL[0];
            if (item.galleryURL != null) {
                image = await item.galleryURL[0];
            } else {
                image = "";
            }

            let ebayObject = { title, vendor, price, currency, image, itemURL };
            currProductsArray.push(ebayObject);
        });

        stockXArray.map(async (item) => {
            let title = await item.name;
            let vendor = "StockX";
            let price = await item.price;
            let currency = "USD";
            let image = await item.thumbnail_url;
            let itemURL = await item.url;


            let stockXObject = { title, vendor, price, currency, image, itemURL };
            currProductsArray.push(stockXObject);

        });

        amazonArray.map(async (item) => {
            let title = await item.title;
            let vendor = "Amazon";
            let price = await item.price.current_price;
            let currency = await item.price.currency;
            let image = await item.thumbnail;
            let itemURL = await item.url;

            let amazonObject = { title, vendor, price, currency, image, itemURL };
            currProductsArray.push(amazonObject);

        });
        setproductInfoArray(currProductsArray);
    };


    var callAPIBundle = async () => {
        await callEbayAPI();
        await callAmazonAPI();
         await callStockxAPI();
        // console.log(stockNumber)
        // setTotalItem(amazonNumber+ebayNumber)
    };




    var choosingCategories = (catName) => {
        if (!chosenCategories.includes(catName)) {
            setChosenCategories(prev => [...prev, catName]);
            let obj = { ...CategoryToggleOption };
            obj.catName = true;
            setCategoryToggle(obj);
        } else {
            let obj = { ...CategoryToggleOption };
            obj.catName = false;
            setCategoryToggle(obj);
            let clone = [...chosenCategories];
            clone.forEach((item, i) => {
                if (catName === item) {
                    clone.splice(i, 1);
                }
            });
            setChosenCategories(clone);
        }
    };




    var goToProductPage = (item) => {
        console.log(item);
        props.sendingItemArray(item);
        props.history.push('/productdetail');

    };


    var createProductCards = () => {
        let allCards = [];
        for (let i = 2; i < productInfoArray.length; i += 3) {
            allCards.push(
                <tr key={productInfoArray[i].title}>
                    <td>
                        <ProductCard
                            onClick={() => {
                                goToProductPage(productInfoArray[i]);
                            }
                            }
                            cardTitle={productInfoArray[i].title}
                            vendor={productInfoArray[i].vendor}
                            price={productInfoArray[i].price}
                            currency={productInfoArray[i].currency}
                            image={productInfoArray[i].image}
                            itemURL={productInfoArray[i].itemURL}
                        />
                    </td>
                    <td>
                        <ProductCard
                            onClick={() => goToProductPage(productInfoArray[i - 1])}
                            cardTitle={productInfoArray[i - 1].title}
                            vendor={productInfoArray[i - 1].vendor}
                            price={productInfoArray[i - 1].price}
                            currency={productInfoArray[i - 1].currency}
                            image={productInfoArray[i - 1].image}
                            itemURL={productInfoArray[i - 1].itemURL}
                        />
                    </td>
                    <td>
                        <ProductCard
                            onClick={() => goToProductPage(productInfoArray[i - 2])}
                            cardTitle={productInfoArray[i - 2].title}
                            vendor={productInfoArray[i - 2].vendor}
                            price={productInfoArray[i - 2].price}
                            currency={productInfoArray[i - 2].currency}
                            image={productInfoArray[i - 2].image}
                            itemURL={productInfoArray[i - 2].itemURL}
                        />
                    </td>

                </tr>
            );
        }

        setproductCardsJSX(allCards);
    };





    useMemo(async()=>{
        await callAPIBundle()
    },[startPoint])

    useEffect(()=>{
        setTotalItem(amazonNumber+ebayNumber+stockNumber)
    },[stockNumber,amazonNumber,ebayNumber])


    useMemo(async () => {
        await loadProductCards();
    }, [ebayArray, stockXArray, amazonArray]);

    useEffect(()=>{
        createProductCards()
    }, [productInfoArray]);

    return (
        <Fragment>
            <div className="searchDiv">
                <div className="searchFilter">
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
                </div>

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
                                                    onClick={() => choosingCategories(category)}
                                                    checked={CategoryToggleOption.category}
                                                />
                                            }

                                            label={category}
                                        />
                                    );
                                })}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="filterPage" >
                <Pagination onChange={(e,value)=>setStartPoint(value)}
                className="pagination" count={totalItem} shape="rounded" variant="outlined" color="standard" />
                <List className="sort" component="nav" aria-label="Device settings">
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
            </div>
            <Table className="productTable">
                <tbody>
                    {productCardsJSX}
                </tbody>
            </Table>
        </Fragment>
    );
};


const mapToProps = dispatch => {
    return {
        sendingItemArray: (item) => dispatch(ChosenItem(item))
    };
};
export default connect(null, mapToProps)(ProductTable);

