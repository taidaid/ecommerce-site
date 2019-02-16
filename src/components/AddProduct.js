import React from "react";

// product name, the product description, the price and a link to a picture

export default () => {
  const handleSubmit = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <label>Name:</label>
        <input required />
        <label>Description:</label>
        <textarea required />
        <label>Price in $:</label>
        <input required />
        <label>Image URL</label>
        <input required />
        <input type="submit" value="Add" className="button" />
      </form>
    </div>
  );
};
