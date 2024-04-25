import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPurchase } from '../../redux/features/purchase/purchaseSlice'
import PurchaseForm from '../../components/purchase/PurchaseForm'



const initialState = {
    product: "",
    quatity: "",
    unit_price: "",
    to_mainstore: "",
    tin: "",
    date: "",
}

function AddPurchase() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const isLoggedIn =  useSelector(selectIsLoggedIn)

    const [purchase, setPurchase] = useState(initialState)

    
    const {product, quatity, unit_price, to_mainstore,tin, date} = purchase

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setPurchase({...purchase, [name]: value})
    };

    const savePurchase = async (e)=>{
        e.preventDefault()
        const formData = {
            product, quatity, unit_price,to_mainstore, tin, date
        }
        console.log(formData)
        await dispatch(createPurchase(formData))
        console.log(formData)
        navigate("/purchase");
    }

  return (
    <div>
        <h3>Add Purchase / ግዢ ፈጽም</h3>
        <PurchaseForm 
            purchase = {purchase}
            savePurchase = {savePurchase}
            handleInputChange={handleInputChange}
        />
    </div>
  )
}

export default AddPurchase