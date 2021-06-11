import SearchBar from "material-ui-search-bar";
import React from 'react'
import './Searchbar.css'

const Searchbar = () => {
    return (
        <SearchBar className="searchBar"
            //value={this.state.value}
            //onChange={(newValue) => this.setState({ value: newValue })}
            //onRequestSearch={() => doSomethingWith(this.state.value)}
        />
    );
}

export default Searchbar