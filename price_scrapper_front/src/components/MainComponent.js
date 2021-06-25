import React, { Fragment } from 'react';
import { withRouter,Switch,Route } from 'react-router';
import Login from './Login/Login'
import Register from './Register/Register'
import ProductDetail from './ProductPage/ProductDetail'
import ForgotPassword from './Login/ConfirmPassword'
import ProductTable from './ProductTable/ProductTable';

var Main = props => {

    if(props.location.pathname==="/home") props.history.push("/")

    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={ProductTable} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/productDetail" component={ProductDetail} />
                <Route exact path="/forgotpass/:email" component={ForgotPassword}/>
            </Switch>
        </Fragment>
    );
};




export default withRouter(Main);