import React, { Fragment } from 'react';
import { withRouter,Switch,Route } from 'react-router';
import Login from './Login/Login'
import ProductTable from './ProductTable/ProductTable'
import Register from './Register/Register'
import ProductDetail from './ProductPage/ProductDetail'


var Main = props => {



    if(props.location.pathname==="/home") props.history.push("/")

    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={ProductTable} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/productDetail" component={ProductDetail} />
            </Switch>
        </Fragment>
    );
};




export default withRouter(Main);