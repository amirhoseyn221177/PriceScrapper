import React from 'react';
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import { Button } from '@material-ui/core';
import ProductCard from '../ProductCard/ProductCard';

const ProductTable = () => {
    return (
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

    );
};

export default ProductTable;
