import React from 'react';
import './App.css';
//redux set up
import { Provider } from 'react-redux';
import store from './redux/store'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import home from './pages/home/index'
import Product from './pages/product/index'
// import Checkout from './pages/checkout/index'


function App() {
  


  return (
    <Provider store={store}>
      <Router>
        <div style={{background:"#F8F7F4"}}> 
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/products" component={Product} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;