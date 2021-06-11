import './App.css';
import NavBar from './components/Header/Header'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import ProductTable from './components/ProductTable/ProductTable';
import Searchbar from './components/Searchbar/Searchbar';

import MainComponent from './components/MainComponent';


function  App(){
  
  return (
    <BrowserRouter>
    <div className="App">
      
        <NavBar />
        <Searchbar />
        <ProductTable />
        <Footer />
      </div>
  </BrowserRouter>
  );
}


export default App;
