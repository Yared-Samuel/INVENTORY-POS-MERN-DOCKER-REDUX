import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm';
import {useDispatch, useSelector} from "react-redux"
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';



const initialState ={
    name: "",
    category: "",
    measurment: "",
    description: "",
    sub_measurment: "",
    sub_measurment_value: "",
    type: ""
}
const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [product, setPoduct] = useState(initialState)

    const isLoading = useSelector(selectIsLoading)
    const {name, category, measurment,  description, sub_measurment, sub_measurment_value, type} = product

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setPoduct({...product, [name]: value})
      };

    const saveProduct = async (e) => {
        e.preventDefault()
        const formData = {
            name,  category, measurment, description, sub_measurment, sub_measurment_value , type
          }
          console.log(formData)

          await dispatch(createProduct(formData))

          navigate("/product")
    }
  return (
    <div>
    {isLoading && <Loader />}
        <h3 className='--mt'>Add new product</h3>
        <ProductForm 
            product = {product}
            saveProduct = {saveProduct}
            handleInputChange = {handleInputChange}            
        />
    </div>
  )
}

export default AddProduct