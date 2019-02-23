import React from "react";

export default props => {
  if (!props.cart.length) return null;

  const deleteCartItem = key => {
    if (window.confirm("Remove from cart?")) {
      props.deleteCartItem(key);
    }
  };

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
            <td className="cart-button">
              <button
                onClick={e => {
                  deleteCartItem(index);
                  e.stopPropagation();
                }}
              >
                ⓧ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
