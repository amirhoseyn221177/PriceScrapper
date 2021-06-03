import React from 'react'
import { Table } from 'react-bootstrap'
import './ProductTable.css'
import ProductCard from '../ProductCard/ProductCard'

const ProductTable = () => {
    return (
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
    )
}

export default ProductTable