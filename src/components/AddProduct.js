import React, { useState } from "react";

// product name, the product description, the price and a link to a picture

export default () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {};

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangePrice = e => {
    setPrice(e.target.value);
  };
  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };
  const handleChangeImage = e => {
    setImage(e.target.value);
  };

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
