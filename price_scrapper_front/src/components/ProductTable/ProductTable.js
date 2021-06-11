import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import ProductCard from '../ProductCard/ProductCard';
import Searchbar from '../Searchbar/Searchbar';

const ProductTable = () => {
    return (
        <Fragment>
            <Searchbar/>
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
        </Fragment>
    );
};

export default ProductTable;
