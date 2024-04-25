import React, { useEffect } from "react";
import "./Sprice.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/features/product/productSlice";

const SpriceForm = ({
  sprice,
  saveSprice,
  handleInputChange,
  handleProductChange,
  handleRemoveProduct,
  handleAddProduct,
}) => {
  const dispatch = useDispatch();
  const { products, isError, message } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError]);

  return (
    // <div className="add-product">
    <div className="cards">
      <form onSubmit={saveSprice} className="">
        <label>Price Category Name:</label>
        <input
          className="input-one"
          type="text"
          placeholder="Price Name"
          name="name"
          value={sprice?.name}
          onChange={handleInputChange}
        />
        <div className="text-rows">
          <p>Products</p>
          <p>Price</p>
        </div>

        {sprice.products.map((product, index) => (
          <div className="rows" key={index}>
            <select
              className="select"
              name="product"
              value={product.product}
              onChange={(e) =>
                handleProductChange(index, "product", e.target.value)
              }
            >
              <option disabled value={""}>
                Products
              </option>
              {products.map((product, index) => {
                const { _id, name } = product;
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>

            <input
              className="input-one"
              type="number"
              placeholder="Product Price"
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={(e) =>
                handleProductChange(index, "sellingPrice", parseFloat(e.target.value))
              }
            />

            <button
              className="remove-btn"
              type="button"
              onClick={() => handleRemoveProduct(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="--my">
          <button className="add-btn" type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
        <div className="--my">
          <button type="submit" className="save-btn">
            Save Price
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default SpriceForm;
