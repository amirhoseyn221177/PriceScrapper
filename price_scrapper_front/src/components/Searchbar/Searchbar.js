import SearchBar from "material-ui-search-bar";
import React from 'react';
import { Button, Dialog, FormControlLabel, IconButton, Checkbox, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import './Searchbar.css';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            open: false,
            categories: ["Clothing", "Shoes", "Computers", "Cars"]
        };
    }

    handleShow = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    //   callAPI = (searchString) => {
    //     console.log(searchString);
    //     axios.post("http://localhost:8080/api/query/search", {searchString})
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error.response)
    //     });
    //     this.setState({ value: "" })
    //   };

    callAPI = async (searchString) => {
        try {
            var ebayResponse = await axios.post("/api/ebay/search", { searchString });
            const ebayJSON = ebayResponse.data
            console.log(ebayJSON)
            const ebayItemArr = ebayJSON.result[0].item
            //    this.props.ebayItemArr = ebayItemArr

            var stockxResponse = await axios.post("/api/stockx/search", { searchString });
            const stockxJSON = stockxResponse.data
            const stockxItemArr = stockxJSON.result
            console.log(stockxItemArr)

            //    this.props.stockxItemArr = stockxItemArr

            var amazonResponse = await axios.post("/api/amazon/search", { searchString });
            const amazonJSON = amazonResponse.data
            const amazonItemArr = amazonJSON.result
            console.log(amazonItemArr)

            //    this.props.amazonItemArr = amazonItemArr


            this.props.setProductsArray(ebayItemArr, stockxItemArr, amazonItemArr);

            this.setState({ searchString: "" })

        } catch (e) {
            console.log(e.response.data.error.message)
        }
    };

    render() {
        return (
            <div className="searchDiv">
                <SearchBar
                    className="searcBar"
                    value={this.state.value}
                    onChange={(newValue) => this.setState({ value: newValue })}
                    onRequestSearch={() => this.callAPI(this.state.value)}
                />
                <Button
                    className="filterButton"
                    variant="contained"
                    color="primary"
                    onClick={this.handleShow}
                >
                    Filter
                </Button>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle className="dialogTitle" disableTypography>
                        <h2>Filter by category</h2>
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers className="dialogContent">
                        <div>
                            {this.state.categories.map(
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
        );
    }
}

export default Searchbar;
