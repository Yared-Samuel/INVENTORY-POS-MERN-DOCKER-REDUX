import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { getFinishedProducts } from "../../redux/features/product/productSlice";
import "./EditSprice.css"
import { getProducts } from '../../redux/features/product/productSlice';
const EditSpriceForm = ({
  sprice,
  handleUpdate,
  handleInputChange,
  handleProductChange,
  handleRemoveProduct,
  handleAddProduct,
  tableData,
  filteredData,
  _id,
  sprices
  
}) => {
  const dispatch = useDispatch();
  const { products, isError, message } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError]);

  console.log(sprices)

  
  return (
    !filteredData ?
       <p>Loading...</p> :
    <div className="cards flexCards">
    
        <form onSubmit={handleUpdate} className="updateForm">
      
        <input
          className="input-one"
          type="text"
          placeholder="Price Name"
          name="name"
          value={filteredData[0]?.name}
          onChange={handleInputChange}
          disabled
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
              required
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
              required
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
            <button
              className="add-btn"
              type="button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>

          <div className="--my">
            <button type="submit" className="save-btn">
              Update
            </button>
          </div>
        </form>
        <div className='priceTable'>
        <h2>{filteredData[0]?.name}</h2>
        <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Selling Price</th>
        </tr>
      </thead>
      <tbody>
        {tableData && tableData.products ? (
          tableData.products.map((product) => (
            <tr key={product._id}>
              <td>{product.product && product.product.name}</td>
              <td>{product.sellingPrice}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No products found</td>
          </tr>
        )}
      </tbody>
    </table>

        </div>
      </div>
  )
}

export default EditSpriceForm