import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddProduct from "./components/AddProduct.js";
import ProductsList from "./components/ProductsList.js";
import SingleProduct from "./components/SingleProduct.js";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = product => {
    setProducts([...(products || [])], product);
  };

  const deleteProduct = key => {
    let updatedProducts = [...products];
    updatedProducts = updatedProducts
      .slice(0, key)
      .concat(updatedProducts.slice(key + 1, updatedProducts.length));
    setProducts(updatedProducts);
  };

  return (
    <Router>
      <div className="App">
        <aside>
          <Link to="/add-product">Add Product</Link>
          <Link to="/">Products List</Link>
        </aside>
        <main>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <ProductsList
                  products={products}
                  deleteProduct={deleteProduct}
                />
              );
            }}
          />
          <Route
            path="/add-product"
            render={props => {
              return (
                <AddProduct addProduct={addProduct} history={props.history} />
              );
            }}
          />
          <Route path="/product/:slug" component={SingleProduct} />
        </main>
      </div>
    </Router>
  );
};

export default App;
