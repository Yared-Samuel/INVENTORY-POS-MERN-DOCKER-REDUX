import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  
  getSprices,
  selectIsLoading,
  updateSprice,
} from "../../redux/features/sprice/spriceSlice";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import "./EditSprice.css"
import EditSpriceForm from "./EditSpriceForm";
const initialState = {
  name: "",
  products: [],
};

function EditSprice() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [sprice, setSprice] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);
  const { name, products } = sprice;
  let filteredData
  let tableData
  const {sprices, isError,message  } = useSelector((state)=>state.sprice)
  useEffect(() => {
      dispatch(getSprices())

      // console.log(sprices)
    if(isError) {
      console.log(message)
    }
  }, [ isError, message, dispatch])

 




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
  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = _id;
    const formData = {
      name,
      products,
    };
    
   await dispatch(updateSprice({ _id: id, formData }));
    navigate('/sprice')
  };

  
  
 
  // useEffect(() => {
    filteredData = sprices?.filter((item) => item._id === _id);
   tableData = filteredData && filteredData[0]; 
    
  // }, [sprices, _id, filteredData, tableData])
  


  return (
    <>
      {isLoading && <Loader />}
      <h3>Update price list</h3>
      <EditSpriceForm 
        _id={_id}
        tableData={tableData}
        filteredData={filteredData}
        sprice={sprice}
        handleUpdate={handleUpdate}
        handleInputChange={handleInputChange}
        handleProductChange={handleProductChange}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        sprices={sprices}
       
      />
  
    </>
  );
}

export default EditSprice;
