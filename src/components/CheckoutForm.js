import React, { Component } from "react";

import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    if (!this.props.cart.length) {
      alert("Add items to the cart to checkout");
      return;
    }
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("http://localhost:9000/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) {
      this.props.showConfirmation();
      this.setState({ complete: true });
      this.props.clearCart();
    }
  }

  getTotal = () => {
    const total = this.props.cart.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    return total;
  };

  render() {
    if (this.state.complete) {
      return <h4>Purchase Complete!</h4>;
    }
    return (
      <div className="checkout">
        <h4>Would you like to complete the purchase?</h4>

        <CardElement />
        <button onClick={this.submit}>
          {!this.props.cart.length ? "Empty Cart" : `Pay $${this.getTotal()}`}
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
