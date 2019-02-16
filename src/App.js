import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddProduct from "./components/AddProduct.js";
import ProductsList from "./components/ProductsList.js";
import SingleProduct from "./components/SingleProduct.js";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <aside>
          <Link to="/add-product">AddProduct</Link>
          <Link to="/">ProductsList</Link>
        </aside>
        <main>
          <Route exact path="/" component={ProductsList} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/product/:slug" component={SingleProduct} />
        </main>
      </div>
    </Router>
  );
};

export default App;
