import React, { useState } from "react";

export default props => {
  const [quantity, setQuantity] = useState(0);

  const handleChangeQuantity = e => {
    setQuantity(parseInt(e.target.value));
  };

  const addToCart = () => {
    if (quantity <= 0 || !quantity) {
      alert("Quantity must be more than 0");
    } else {
      props.addToCart({ product: props.product, quantity: quantity });
    }
  };

  return (
    <div>
      {props.product ? (
        <div className="single-product">
          <img src={props.product.image} alt="" />
          <h2>{props.product.name}</h2>
          <p className="description">{props.product.description}</p>
          <p className="price">${props.product.price}</p>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            max="10"
            onChange={handleChangeQuantity}
          />
          <div>
            <button type="submit" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <h2>No Product Found!</h2>
      )}
    </div>
  );
};
