import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createProdCat, selectIsLoading } from '../../redux/features/productCategory/categorySlice'
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import ProdCatForm from '../../components/prodCat/prodCatForm/ProdCatForm';



const initialState ={
    name: "",
    description: ""
}
const AddPrice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [prodCat, setPodCat] = useState(initialState)

    // const isLoading = useSelector(selectIsLoading)

    const {name, description} = prodCat

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setPodCat({...prodCat, [name]: value})
      };

    const saveProductcategory = async (e) => {
        e.preventDefault()
        const formData = {
            name, description
          }
          console.log(formData)

          await dispatch(createProdCat(formData))

          navigate("/dashboard")
    }
  return (
    <div>
    {/* {isLoading && <Loader />} */}
        <h3 className='--mt'>Add Category</h3>
        <ProdCatForm 
            prodCat = {prodCat}
            saveProductcategory = {saveProductcategory}
            handleInputChange = {handleInputChange}            
        />
    </div>
  )
}

export default AddPrice