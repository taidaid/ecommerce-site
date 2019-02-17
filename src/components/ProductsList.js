import React from "react";

export default props => {
  const deleteProduct = key => {
    props.deleteProduct(key);
  };
  return (
    <div>
      {console.log(props.products)}
      {props.products
        ? props.products.map((product, index) => {
            return (
              <div key={index}>
                <img src={product.image} alt={`${product.name}`} />
                <h2>{product.name}</h2>
                <p className="description">{product.decsription}</p>
                <p className="price">{product.price}</p>
                <button
                  onClick={e => {
                    deleteProduct(index);
                    e.stopPropagation();
                  }}
                >
                  ⓧ
                </button>
              </div>
            );
          })
        : "No Products"}
    </div>
  );
};
