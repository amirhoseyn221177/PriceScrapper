import React from 'react';
import { Table } from 'react-bootstrap';
import './ProductTable.css';
import { List, ListItemText, ListItem, Menu, MenuItem } from '@material-ui/core';
import ProductCard from '../ProductCard/ProductCard';

const ProductTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        'Highest Rating',
        'Lowest Rating',
        'Highest Price',
        'Lowest Price'
    ];
    return (
        <div >
            <div className="tableDiv">
                <Table className="productTable">
                    <thead>
                        <tr>
                            <th colSpan='3'>
                                <List component="nav" aria-label="Device settings">
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
                                    onClose={handleClose}
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
                            </th>
                        </tr>
                    </thead>
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
        </div>
    );
};

export default ProductTable;
