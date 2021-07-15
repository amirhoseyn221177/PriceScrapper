import './App.css';
import NavBar from './components/Header/Header'
import { Link, BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import MainComponent from './components/MainComponent';
import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function App() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div>
                  <ul className="popupList">
                    <li><Link className="popupItem" to={'/login'}><Button onClick={handleClose}> Login to your account </Button></Link></li>
                    <li><Link className="popupItem" to={'/home'}><Button onClick={handleClose}>Visit as guest </Button></Link></li>
                  </ul>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <NavBar />
        <MainComponent />
        <Footer />
      </div >
    </BrowserRouter >
  );
}


export default App;
