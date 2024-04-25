import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom'
import Loader from "../../components/loader/Loader";
import {
  createSprice,
  selectIsLoading,
} from "../../redux/features/sprice/spriceSlice";
import SpriceForm from "../../components/sprice/spriceForm/SpriceForm";

const initialState = {
  name: "",
  products: [],
};

function AddSprice() {
  
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const [sprice, setSprice] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);
  const { name, products } = sprice;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSprice({ ...sprice, [name]: value });
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...sprice.products];
    updatedProducts[index][key] = value;
    setSprice({ ...sprice, products: updatedProducts });
  };

  const handleAddProduct = () => {
    const newProduct = { product: "", sellingPrice: 0 };
    setSprice({ ...sprice, products: [...sprice.products, newProduct] });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...sprice.products];
    updatedProducts.splice(index, 1);
    setSprice({ ...sprice, products: updatedProducts });
  };

  const saveSprice = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      products,
    };
    console.log(formData);

    await dispatch(createSprice(formData));
    // navigate("/sprice")
  };

  return (
    <>
      {isLoading && <Loader />}
      <h3>Add price list</h3>
      <SpriceForm
        sprice={sprice}
        saveSprice={saveSprice}
        handleInputChange={handleInputChange}
        handleProductChange={handleProductChange}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />
    </>
  );
}

export default AddSprice;
