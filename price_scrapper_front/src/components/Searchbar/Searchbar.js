import SearchBar from "material-ui-search-bar";
import React, { useState } from 'react';
import { Button, Dialog, FormControlLabel, IconButton, Checkbox, DialogTitle, DialogContent } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import './Searchbar.css';

const Searchbar = () => {
    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const categories = ["Clothing", "Shoes", "Computers", "Cars"]

    return (
        <div className="searchDiv">
            <SearchBar className="searchBar"
            //value={this.state.value}
            //onChange={(newValue) => this.setState({ value: newValue })}
            //onRequestSearch={() => doSomethingWith(this.state.value)}
            />
            <Button
                className="filterButton"
                variant="contained"
                color="primary"
                onClick={handleShow}
            >
                Filter
            </Button>
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

export default Searchbar