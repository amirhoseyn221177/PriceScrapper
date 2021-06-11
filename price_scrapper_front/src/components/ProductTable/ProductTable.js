import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
import Searchbar from '../Searchbar/Searchbar';

const ProductTable = () => {
    return (
        <Fragment>
            <Searchbar />
            <div className="tableDiv">
            <Table className="productTable">
                <tbody>
                    <tr>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                    </tr>
                    <tr>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                    </tr>
                    <tr>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                        <td><ProductCard /></td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </Fragment>

    );
};

export default ProductTable;
