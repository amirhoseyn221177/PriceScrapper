import './App.css';
import NavBar from './components/Header/Header'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import MainComponent from './components/MainComponent';
import SuggestedItems from './components/SuggestedItems/SuggestedItems';
import React from 'react';

function  App(){
  
  return (
    <BrowserRouter>
    <div className="App">
        <NavBar />
        <MainComponent />
        {/* <Footer /> */}
      </div>
  </BrowserRouter>
  );
}


export default App;
