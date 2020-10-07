
import React from 'react';
import './App.css';
//redux set up
import { Provider } from 'react-redux';
import store from './redux/store'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

//pages
import home from './pages/home/index'
import Profile from './pages/profile/index'
import ShoppingCard from './pages/shoppingCard/index'
import Auth from './features/auth/index'
//utils
import PrivateRoute from './utils/PrivateRoute';
//
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { logoutUser, getUser} from './redux/actions/userAction';
import { SET_AUTHENTICATED } from './redux/types'
const dotenv = require('dotenv').config()

const token = localStorage.jwtToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href='/login';
    
  }else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{background:"#F8F7F4"}}> 
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/shopping-card" component={ShoppingCard} />
            <Route exact path="/login" component={Auth} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
