import React from "react";

export default props => {
  const addToCart = () => {
    props.addToCart({ product: props.product, quantity: 1 });
  };
  return (
    <div>
      {/* {console.log(props.product)} */}
      {props.product ? (
        <div className="single-product">
          <img src={props.product.image} alt="" />
          <h2>{props.product.name}</h2>
          <p className="description">{props.product.description}</p>
          <p className="price">${props.product.price}</p>
          <button onClick={addToCart}>Add To Cart</button>
        </div>
      ) : (
        <h2>No Product Found!</h2>
      )}
    </div>
  );
};
