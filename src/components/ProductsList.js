import React from "react";

export default props => {
  const deleteProduct = key => {
    props.deleteProduct(key);
  };
  return (
    <div className="products-list">
      {/* {console.log(props.products)} */}
      {props.products.length > 0 ? (
        props.products.map((product, index) => {
          return (
            <div
              className="product"
              key={index}
              onClick={() => props.history.push("/product/" + product.slug)}
            >
              <img src={product.image} alt={`${product.name}`} />
              <h2>{product.name}</h2>
              <p className="description">{product.decsription}</p>
              <p className="price">${product.price}</p>
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
      ) : (
        <h2>No Products Found!</h2>
      )}
    </div>
  );
};
