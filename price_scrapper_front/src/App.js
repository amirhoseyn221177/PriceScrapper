import './App.css';
import NavBar from './components/Header/Header'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import ProductTable from './components/ProductTable/ProductTable';
import Searchbar from './components/Searchbar/Searchbar';
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <NavBar />
        <Switch>
          <Route exact path="/">
            <Searchbar />
            <ProductTable />
          </Route>
          <Route exact path="/home">
            <Searchbar />
            <ProductTable />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
