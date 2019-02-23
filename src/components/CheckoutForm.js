import React, { Component } from "react";

import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("http://localhost:9000/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) {
      this.props.showConfirmation();
      this.setState({ complete: true });
      this.clearCart();
    }
  }

  clearCart = () => {
    this.props.clearCart();
  };

  render() {
    if (this.state.complete) {
      return <h4>Purchase Complete!</h4>;
    }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
