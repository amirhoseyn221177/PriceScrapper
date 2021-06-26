import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Table } from 'react-bootstrap';
import { List, ListItemText, ListItem, Menu, MenuItem } from '@material-ui/core';
import { Button, Dialog, FormControlLabel, IconButton, Checkbox, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ProductCard from '../ProductCard/ProductCard';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import './ProductTable.css';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Category } from "@material-ui/icons";
import {NavLink} from 'react-router-dom'

const options = [
    'Highest Rating',
    'Lowest Rating',
    'Highest Price',
    'Lowest Price'
];

const categories = ["Clothing", "Shoes", "Computers", "Cars"];


const ProductTable = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                marginTop: theme.spacing(2)
            },
        },
    }));
    const classes = useStyles();
    const [ebayArray, setEbayArray] = useState([]);
    const [stockXArray, setStockXArray] = useState([]);
    const [amazonArray, setAmazonArray] = useState([]);
    const [productInfoArray, setproductInfoArray] = useState([]);
    const [productCardsJSX, setproductCardsJSX] = useState([]);
    // const [paginationEbay, setPaginationEbay] = useState({ start: 0, limit: 5 });
    // const [paginationAmazon, setPaginationAmazon] = useState({ start: 0, limit: 5 });
    // const [paginationStockx, setPaginationStockx] = useState({ start: 0, limit: 5 });
    const [searchText, setSearchText] = useState("iphone");
    const [chosenCategories, setChosenCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [CategoryToggleOption, setCategoryToggle] = useState({ Clothing: false, Shoes: false, Computers: false, Cars: false });
    const [open, setOpen] = useState(false);
    const [limit,setLimit]= useState(0)
    const [paginationPageNumber,setPaginationPageNumber]=useState(1)

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
            var amazonResponse = await axios.post("/api/amazon/search", { searchText,limit });
            const amazonJSON = await amazonResponse.data;
            const amazonItemArr = await amazonJSON.result;
            setAmazonArray(amazonItemArr);
        } catch (e) {
            console.log(e);

        }

    };


    var callEbayAPI = async () => {
        try {
            var ebayResponse = await axios.post("/api/ebay/search", { searchText,limit });
            const ebayJSON = await ebayResponse.data;
            const ebayItemArr = await ebayJSON.result[0].item;
            setEbayArray(ebayItemArr);
        } catch (e) {
            console.log(e);

        }

    };


    var callStockxAPI = async () => {
        try {
            var stockxResponse = await axios.post("/api/stockx/search", { searchText,limit });
            const stockxJSON = await stockxResponse.data;
            const stockxItemArr = await stockxJSON.result;
            setStockXArray(stockxItemArr);
        } catch (e) {
            console.log(e);
        }

    };


    useEffect(async () => {
        console.log(91);
        await callAmazonAPI();
        await callStockxAPI();
        await callEbayAPI();
    }, []);


    console.log(chosenCategories);





    var loadProductCards = async () => {
        let currProductsArray = [];
        ebayArray.map(async (item, i) => {
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

        stockXArray.map(async (item) => {
            let title = await item.name;
            let vendor = "StockX";
            let price = await item.price;
            let currency = "USD";
            let image = await item.thumbnail_url;

            let stockXObject = { title, vendor, price, currency, image };
            currProductsArray.push(stockXObject);

        });

        amazonArray.map(async (item) => {
            let title = await item.title;
            let vendor = "Amazon";
            let price = await item.price.current_price;
            let currency = await item.price.currency;
            let image = await item.thumbnail;

            let amazonObject = { title, vendor, price, currency, image };
            currProductsArray.push(amazonObject);

        });
        setproductInfoArray(currProductsArray);
    };


    var callAPIBundle = async () => {
        await callEbayAPI();
        await callAmazonAPI();
        await callStockxAPI();
    };


    var choosingCategories = (catName) => {
        if (!chosenCategories.includes(catName)) {
            setChosenCategories(prev => [...prev, catName])
            let obj = {...CategoryToggleOption};
            obj.catName = true;
            setCategoryToggle(obj)
        } else {
            let obj = {...CategoryToggleOption};
            obj.catName = false;
            setCategoryToggle(obj)
            let clone = [...chosenCategories];
            clone.forEach((item, i) => {
                if (catName === item) {
                    clone.splice(i, 1);
                }
            });
            setChosenCategories(clone);
        }
    };




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
            <NavLink to="google.com">
                sex
            </NavLink>
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
            <div className="filterPag" >
                <Pagination className="pagination" count={10} shape="rounded" variant="outlined" color="standard" />
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

export default ProductTable;

