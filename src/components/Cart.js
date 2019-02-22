import React from "react";

export default props => {
  if (!props.cart.length) return null;

  return (
    <table className="cart">
      <tbody>
        <tr>
          <td colSpan="3">
            <h2>Cart</h2>
          </td>
        </tr>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
        {props.cart.map((item, index) => (
          <tr key={index}>
            <td>{item.product.name}</td>
            <td>{item.quantity}</td>
            <td>${item.quantity * item.product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
