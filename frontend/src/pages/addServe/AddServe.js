import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createServe, selectIsLoadingServe } from '../../redux/features/serve/serveSlice'
import Loader from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import "./AddServe.css"
import { useNavigate } from 'react-router-dom';
import { BsFillBackspaceReverseFill } from "react-icons/bs"

const initialState = {
    serveName: "",
    serveCode: "",
    servePrice: "",
    serveMeasure: "",
    
}

const AddServe = () => {
    const dispatch = useDispatch()
    const [serve, setServe] = useState(initialState)
    const navigate = useNavigate()
    const isLoading = useSelector(selectIsLoadingServe)
    const {serveName, serveCode, servePrice, serveMeasure} = serve



    const gToServe = () =>{
        navigate("/serve")
      }
    
    const handleInputChange= (e)=>{
        const {name, value} = e.target
        setServe({...serve, [name]: value})
    }

    const saveServe = async (e)=>{
        e.preventDefault()
        const formData = {
            serveName, serveCode, servePrice, serveMeasure
        }
        console.log(formData)
        await dispatch(createServe(formData))
        
    }
  return (
    <>
    {isLoading && <Loader />}
    <div className='title-button'>
    <h3 className='title-main'>Add Services</h3>
    
    <button type='button' className='back-button'  onClick={gToServe}><BsFillBackspaceReverseFill size={30} color='gray' /></button>
    

    </div>
        
        <div className='add'>
        <Card className="card">
            <form onSubmit={saveServe} >
            <div className='form'>
            <div className='input-lable'>
                <label>Service Code:</label>
                <input type='number' placeholder='Code' name='serveCode' value={serve?.serveCode} onChange={handleInputChange}/>
            </div>
            <div className='input-lable'>
                <label>Service Name:</label>
                <input type='text' placeholder='Service Name' name='serveName' value={serve?.serveName} onChange={handleInputChange}/>
            </div>
            <div className='input-lable'>
            <label>Selling Price:</label>
                <input type='decimal' placeholder='Measurment' name='servePrice' value={serve?.servePrice} onChange={handleInputChange}/>
            </div>
            <div className='input-lable'>
            <label>Measeured by:</label>
                <input type='text' placeholder='Measurment of service' name='serveMeasure' value={serve?.serveMeasure} onChange={handleInputChange}/>
            </div>
            </div>
                
                
            <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Add Service</button>
            </div>
            </form>
        </Card>
    </div>
    </>
  )
}

export default AddServe