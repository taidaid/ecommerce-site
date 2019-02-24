import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./components/CheckoutForm";

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
    let newProducts = [...products];
    newProducts = newProducts
      .slice(0, key)
      .concat(newProducts.slice(key + 1, newProducts.length));
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const deleteCartItem = key => {
    let newCart = [...cart];
    newCart = newCart
      .slice(0, key)
      .concat(newCart.slice(key + 1, newCart.length));
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    const newCart = [];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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
          <Link to={`/checkout`}>Checkout</Link>
        </aside>
        <main>
          <Cart deleteCartItem={deleteCartItem} cart={cart} />
          <Confirmation confirmation={confirmation} />
          <Switch>
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
              render={({ match, history }) => {
                return (
                  <SingleProduct
                    product={products.find(p => p.slug === match.params.slug)}
                    addToCart={addToCart}
                    history={history}
                  />
                );
              }}
            />
            <Route
              exact
              path="/checkout"
              render={() => (
                <StripeProvider apiKey="pk_test_fUuLl3ihZQmM4yL40kxbqWUJ">
                  <div className="example">
                    <h1>Checkout</h1>
                    <Elements>
                      <CheckoutForm
                        showConfirmation={showConfirmation}
                        clearCart={clearCart}
                        cart={cart}
                      />
                    </Elements>
                  </div>
                </StripeProvider>
              )}
            />
            <Route
              render={({ history }) => (
                <ProductsList
                  products={products}
                  deleteProduct={deleteProduct}
                  history={history}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
