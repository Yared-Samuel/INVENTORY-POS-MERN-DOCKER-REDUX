import React, { useEffect } from 'react'
import "./ProductForm.css"
import { getProdCat } from '../../../redux/features/productCategory/categorySlice'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow, GiSave } from 'react-icons/gi'


const ProductForm = ({product, handleInputChange, saveProduct}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const gToServe = () =>{
    navigate("/purchase")
  }
  const {categories, isError, message} = useSelector((state)=>state.category)
  useEffect(() => {
    
     dispatch(getProdCat())
    
    if(isError){
     console.log(message)
    }
     
   }, [dispatch,  message, isError])
   
  return (
    <div className='add-purchase'>
    <div className='btn-back'>
    <button type='button' className='back-button'  onClick={gToServe}>Back <GiReturnArrow /></button>

    </div>
        <div className="card">
            <form onSubmit={saveProduct}>
            <div className='input-dynamic'>
                <input type='text' placeholder='Product Name' name='name' className='input-one' value={product?.name} onChange={handleInputChange}/>
                <select name='category' className='select' value={product?.category} onChange={handleInputChange}>
                  <option disabled value={""}>Category</option>
                  {
                    categories.map((category, index)=>{
                    const {_id, name} = category
                    return(<option key={_id} value={_id}>{name}</option>)
                  
                  })
                  }
                  
                </select>
                <input type='text' placeholder='Measurment' name='measurment' className='input-one' value={product?.measurment} onChange={handleInputChange}/>

            </div>
                <div className='input-dynamic'>
                <input type='text' placeholder='sub_measurment_name' name='sub_measurment' className='input-one' value={product?.sub_measurment} onChange={handleInputChange}/>
                <input type='number' placeholder='sub_measurment_value' name='sub_measurment_value' className='input-one' value={product?.sub_measurment_value} onChange={handleInputChange}/>
                <select name='type' className='select' value={product?.type} onChange={handleInputChange} required>
                  <option disabled value={""}>Product Type</option>
                  <option  value={"finished"}>Finished - የሚሸጥ</option>
                  <option  value={"raw"}>Raw - ተሰርቶ የሚሸጥ</option>
                  <option  value={"fixed"}>Fixed - ቋሚ</option>
                  <option  value={"use-and-throw"}>Use and throw - አላቂ</option>
                  <option  value={"others"}>Others -  ሌሎች</option>
                                    
                </select>
                </div>

                <div className='input-dynamic'>
                
                <input type='text' placeholder='Description' name='description' className='input-one' value={product?.description} onChange={handleInputChange}/>

                </div>
                
                
            <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Save product .<GiSave /></button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default ProductForm