import React from "react";
import Truncate from "react-truncate";

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
              <div className="productImage">
                <img src={product.image} alt={`${product.name}`} />
              </div>

              <h2>{product.name}</h2>
              <p className="description">
                <Truncate lines={3} ellipsis={<span>...</span>}>
                  {product.description}
                </Truncate>
              </p>
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
