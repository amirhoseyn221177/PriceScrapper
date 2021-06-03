import './App.css';
import NavBar from './components/Header/Header'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
        <NavBar />
        <Footer />
      </div>
  </BrowserRouter>
  );
}


export default App;
