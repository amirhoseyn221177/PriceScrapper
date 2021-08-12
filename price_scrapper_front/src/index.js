import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import {Provider} from 'react-redux'
import thunk  from 'redux-thunk'
import Auth from './reducers/AuthReducer'
import ItemReducer from './reducers/ItemReducer'
import Items from './reducers/itemsReducer'
import Rating from './reducers/RatingReducer'
const rootreducer=combineReducers({
  AuthReducer:Auth,
  item:ItemReducer,
  items :  Items,
  givenRate : Rating
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
