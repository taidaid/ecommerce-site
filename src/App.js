import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddProduct from "./components/AddProduct.js";
import ProductsList from "./components/ProductsList.js";
import SingleProduct from "./components/SingleProduct.js";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation.js";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const addProduct = product => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const showConfirmation = () => {
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
    }, 2000);
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
    const index = cart.findIndex(item => {
      return item.product.slug === product.slug;
    });

    let newCart = [...(cart || [])];

    if (index !== -1) {
      newCart[index].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Router>
      <div id="App">
        <aside>
          <Link to={`/`}>Products</Link>
          <Link to={`/add-product`}>Add product</Link>
        </aside>
        <main>
          <Cart cart={cart} />
          <Confirmation confirmation={confirmation} />
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
              <AddProduct
                addProduct={addProduct}
                products={products}
                history={history}
                showConfirmation={showConfirmation}
              />
            )}
          />
          <Route
            path="/product/:slug"
            render={({ match }) => {
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
