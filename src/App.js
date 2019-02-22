import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddProduct from "./components/AddProduct.js";
import ProductsList from "./components/ProductsList.js";
import SingleProduct from "./components/SingleProduct.js";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  const addProduct = product => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = key => {
    let updatedProducts = [...products];
    updatedProducts = updatedProducts
      .slice(0, key)
      .concat(updatedProducts.slice(key + 1, updatedProducts.length));
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const addToCart = ({ product, quantity }) => {
    const updatedCard = [...(cart || []), { product, quantity }];
    setCart(updatedCard);
  };

  return (
    <Router>
      <div id="App">
        <aside>
          <Link to={`/`}>Products</Link>
          <Link to={`/add-product`}>Add product</Link>
        </aside>
        <main>
          <Route
            exact
            path={`/`}
            render={({ history }) => (
              <ProductsList
                products={products}
                deleteProduct={deleteProduct}
                history={history}
              />
            )}
          />
          <Route
            path="/add-product"
            render={({ history }) => (
              <AddProduct addProduct={addProduct} history={history} />
            )}
          />
          <Route
            path="/product/:slug"
            render={({ match }) => {
              console.log(match.params.slug);
              console.log(products.map(product => product));
              return (
                <SingleProduct
                  product={products.find(p => p.slug === match.params.slug)}
                  addToCart={addToCart}
                />
              );
            }}
          />
        </main>
      </div>
    </Router>
  );
};

export default App;
