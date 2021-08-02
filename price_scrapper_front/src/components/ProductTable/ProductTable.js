import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
    // const [stockXArray, setStockXArray] = useState([]);
    const [amazonArray, setAmazonArray] = useState([]);
    const [productInfoArray, setproductInfoArray] = useState([]);
    const [productCardsJSX, setproductCardsJSX] = useState([]);
    // const [paginationEbay, setPaginationEbay] = useState({ start: 0, limit: 5 });
    // const [paginationAmazon, setPaginationAmazon] = useState({ start: 0, limit: 5 });
    // const [paginationStockx, setPaginationStockx] = useState({ start: 0, limit: 5 });
    const [searchText, setSearchText] = useState("");
    const [chosenCategories, setChosenCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [CategoryToggleOption, setCategoryToggle] = useState({ Clothing: false, Shoes: false, Computers: false, Cars: false });
    const [open, setOpen] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [startPoint, setStartPoint] = useState(1);
    const [ebayNumber, setEbayNumber] = useState(0);
    const [amazonNumber, setAmazonNumber] = useState(0);
    const [checkboxStates, setCheckboxStates] = useState([true, true]) // Amazon, Ebay
    const [query , setQuery]= useState("")
    const handleClickListItem = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    // const handleClickVendorList = (event) => {
    //     console.log(37);
    //     setAnchorEl(event.currentTarget);
    // };

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
            console.log(searchText)
            var amazonResponse = await axios.post("/api/amazon/search", { searchText, startPoint, sortVariable: options[selectedIndex] });
            const amazonJSON = await amazonResponse.data;
            const amazonItemArr = await amazonJSON.result;
            console.log("this is amazon"+amazonItemArr)
            setAmazonNumber(amazonJSON.totalLength);
            setAmazonArray(amazonItemArr);
        } catch (e) {
            console.log(e.response.data.error.message);

        }

    };



    var callEbayAPI = async () => {
        try {
            var ebayResponse = await axios.post("/api/ebay/search", { searchText, startPoint, sortVariable: options[selectedIndex] });
            const ebayJSON = await ebayResponse.data;
            const ebayItemArr = await ebayJSON.result;
            setEbayNumber(ebayJSON.totalLength);
            setEbayArray(ebayItemArr);
            // return ebayJSON.totalLength
        } catch (e) {
            console.log(e);

        }

    };



    // var callStockxAPI = async () => {
    //     try {
    //         var stockxResponse = await axios.post("/api/stockx/search", { searchText, startPoint });
    //         const stockxJSON = await stockxResponse.data;
    //         const stockxItemArr = await stockxJSON.result;
    //         setStockXArray(stockxItemArr);
    //     } catch (e) {
    //         console.log(e);
    //     }

    // };


    useEffect(async () => {
        setStartPoint(1);
        await callAPIBundle();
    }, [selectedIndex]);


    useEffect(() => {
        setTotalItem(ebayNumber > amazonNumber ? Math.ceil(ebayNumber / 3) - 1 : Math.ceil(amazonNumber / 3) - 1);
    }, [ebayNumber, amazonNumber]);









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

        // stockXArray.map(async (item) => {
        //     let title = await item.name;
        //     let vendor = "StockX";
        //     let price = await item.price;
        //     let currency = "USD";
        //     let image = await item.thumbnail_url;
        //     let itemURL = await item.url;


        //     let stockXObject = { title, vendor, price, currency, image, itemURL };
        //     currProductsArray.push(stockXObject);

        // });

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


    var callAPIBundle = async (val) => {
        console.log("Amazon state", checkboxStates[0])
        console.log("Ebay state", checkboxStates[1])
        if ((checkboxStates[0] && checkboxStates[1]) || (!checkboxStates[0] && !checkboxStates[1])) {
            console.log("here1")
            await callAmazonAPI();
            await callEbayAPI();
        } else if (checkboxStates[0]) {
            console.log("here2")
            setEbayArray([])
            await callAmazonAPI();
        } else if (checkboxStates[1]) {
            console.log("here3")
            setAmazonArray([])
            await callEbayAPI();
        } 
        //  await callStockxAPI();
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

    function addToRecentlyViewed(item) {
        let token = localStorage.getItem("token")
        
        axios.post('/api/items/addToRecent', { item } ,{
            headers:{
                "Authorization" : token
            }
        })
            .then(response => console.log(response.data));
    }

    var goToProductPage = (item, index,info) => {
        console.log(item);
        console.log("this is index"+index)
        props.sendingItemArray(item);
        addToRecentlyViewed(item);
        props.history.push({
            pathname: '/productdetail',
            state: { productInfoArray, index }
        });
    };


    var createProductCards = () => {
        let allCards = [];
        for (let i = 2; i < productInfoArray.length; i += 3) {
            allCards.push(
                <tr key={productInfoArray[i].title}>
                    <td>
                        <ProductCard
                            onClick={() => goToProductPage(productInfoArray[i - 2], i - 2, productInfoArray)}
                            cardTitle={productInfoArray[i - 2].title}
                            vendor={productInfoArray[i - 2].vendor}
                            price={productInfoArray[i - 2].price}
                            currency={productInfoArray[i - 2].currency}
                            image={productInfoArray[i - 2].image}
                            itemURL={productInfoArray[i - 2].itemURL}
                        />
                    </td>

                    <td>
                        <ProductCard
                            onClick={() => goToProductPage(productInfoArray[i - 1], i - 1, productInfoArray)}
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
                            onClick={() => {
                                goToProductPage(productInfoArray[i], i, productInfoArray);
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


                </tr>
            );
        }

        setproductCardsJSX(allCards);
    };




    let dontRunFirstTime = useRef(true);
    useMemo(async () => {
        if (dontRunFirstTime.current) {
            dontRunFirstTime.current = false;
            return;
        }
        await callAPIBundle();
    }, [startPoint]);

    async function filterItemArray(val) {
        console.log("LOOK AT ME", val)
        setQuery(val)
        searchNow(val)
        // console.log(val);
        // const newList = productInfoArray.filter((item) => item.vendor == val);
        // setproductInfoArray(newList)
    }

    function searchNow(searchValue) {
        callAPIBundle()
        setSearchText(searchValue)
    }


    useMemo(async () => {
        await loadProductCards();
    }, [ebayArray, amazonArray]);

    useEffect(() => {
        createProductCards();
    }, [productInfoArray]);


    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setSearchText(query)
        }, 2000);
        return ()=> clearTimeout(timeOut)
    },[query]);

    useEffect(async()=>{
        await callAPIBundle()
    },[searchText])

    return (
        <Fragment>
            <div className="searchDiv">
                <div className="searchFilter">
                    <SearchBar
                        className="searchBar"
                        value={query}
                        onChange={newValue => setQuery(newValue)}
                        onCancelSearch={() => setSearchText("")}
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
            {searchText !== "" ?
                <div className="optionsDiv">
                    <div className="filterPage" >
                    <FormControlLabel
                            control={<Checkbox name="SomeName" value="Amazon" />}
                            label="Amazon"
                            onChange={(e) => {
                                // console.log("CURRENT EBAY STATE", ebayState)
                                // let newEbayState = !ebayState
                                // setEbayState(newEbayState)
                                // console.log("NEW EBAY STATE", ebayState)
                                console.log("CURRENT EBAY STATE", checkboxStates[1])
                                let newCheckboxState = checkboxStates
                                newCheckboxState[1] = !newCheckboxState[1]
                                setCheckboxStates(newCheckboxState)
                                console.log("NEW EBAY STATE", checkboxStates[1])
                                filterItemArray(searchText)
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox name="SomeName" value="Ebay" />}
                            label="Ebay"
                            onChange={(e) => {
                                // console.log("CURRENT AMAZON STATE", amazonState)
                                // let newAmazonState = !amazonState
                                // setAmazonState(newAmazonState)
                                // console.log("NEW AMAZON STATE", amazonState)
                                console.log("CURRENT AMAZON STATE", checkboxStates[0])
                                let newCheckboxState = checkboxStates
                                newCheckboxState[0] = !newCheckboxState[0]
                                setCheckboxStates(newCheckboxState)
                                console.log("NEW AMAZON STATE", checkboxStates[1])
                                filterItemArray(searchText)
                            }}
                        />

                        <Pagination style={{ position: 'relative', zIndex: "-10" }} page={startPoint} onChange={(e, value) => setStartPoint(value)}
                            className="pagination" count={totalItem} shape="rounded" variant="outlined" color="standard" />
                        <List className="sort" component="nav" aria-label="Device settings">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Sort By:"
                                onClick={handleClickListItem}
                            >
                                <ListItemText primary={`Sort by: ${options[selectedIndex]}`} />
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
                </div>
                : <div />}
        </Fragment>
    );
};

                        
const mapToProps = dispatch => {
    return {
        sendingItemArray: (item) => dispatch(ChosenItem(item))
    };
};
export default connect(null, mapToProps)(ProductTable);