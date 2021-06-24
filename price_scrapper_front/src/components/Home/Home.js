import React from 'react';
import { Fragment } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ProductTable from '../ProductTable/ProductTable';
import SuggestedItems from '../SuggestedItems/SuggestedItems';

const Home = () => {
    return (
        <Fragment>
            <Searchbar />
            <ProductTable />
            <SuggestedItems />
        </Fragment>
    )
}

export default Home;