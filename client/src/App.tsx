import React from 'react';
import Home from './pages/home/home'
import Customers from './pages/customers/customers'
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {

  return (
      <Router>      
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/customers">
            <Customers />
          </Route>       
      </Router>
  );
}
export default App;
