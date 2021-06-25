import SearchBar from "material-ui-search-bar";
import React, { Fragment, useEffect, useState } from "react";
import "./Searchbar.css";
import axios from "axios";


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
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
       var ebayResponse = await  axios.post("/api/ebay/search", {searchString});
       const ebayJSON = ebayResponse.data
       console.log(ebayJSON)
       const ebayItemArr = ebayJSON.result[0].item
    //    this.props.ebayItemArr = ebayItemArr

       var stockxResponse = await  axios.post("/api/stockx/search", {searchString}); 
       const stockxJSON = stockxResponse.data
       const stockxItemArr = stockxJSON.result
       console.log(stockxItemArr)

    //    this.props.stockxItemArr = stockxItemArr

       var amazonResponse = await  axios.post("/api/amazon/search", {searchString}); 
       const amazonJSON = amazonResponse.data
       const amazonItemArr = amazonJSON.result
       console.log(amazonItemArr)

    //    this.props.amazonItemArr = amazonItemArr


        this.props.setProductsArray(ebayItemArr, stockxItemArr, amazonItemArr);

       this.setState({ searchString: "" })

    } catch(e) {
        console.log(e.response.data.error.message)
    }
};

  render() {
    return (
      <SearchBar
        id="Search-Bar"
        value={this.state.value}
        onChange={(newValue) => this.setState({ value: newValue })}
        onRequestSearch={() => this.callAPI(this.state.value)}
      />
    );
  }
}

export default Searchbar;