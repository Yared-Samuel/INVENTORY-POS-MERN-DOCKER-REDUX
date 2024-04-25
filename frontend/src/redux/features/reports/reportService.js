import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL

const DAILY_SALE = `/api/report/sale-daily`
const DAILY_PURCHASE = `/api/report/purchase-daily`
const DAILY_SERVE = `/api/report/serve-daily`
const STORE_DAILY_SALE = `/api/report/store-sale-daily`
const STORE_BALANCE = `/api/report/probalance`
const INV_BALANCE = `/api/report/mainStoreBalance`
const CASH_BALANCE = `/api/report/cashBalance`


const getDailySale = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${DAILY_SALE}`)
    return response.data
}

const getDailyServe = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${DAILY_SERVE}` )
    return response.data
}




const getDailyPurchase = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${DAILY_PURCHASE}` )
    return response.data
}



const getStoreDailySale = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${STORE_DAILY_SALE}` )
    return response.data
}

const getStoreBalance = async (formData)=>{
  
    console.log("firstName")
    const response = await axios.get(`${BACKEND_URL}${STORE_BALANCE}` )
    console.log(response)
    return response.data
}

const getInvBalance = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${INV_BALANCE}` )
    return response.data
}

const getCashBalances = async (formData)=>{
  
  
    const response = await axios.get(`${BACKEND_URL}${CASH_BALANCE}` )
    return response.data
}


const reportService = {
    getDailySale,
    getDailyServe,
    getDailyPurchase,
    getStoreDailySale,
    getStoreBalance,
    getInvBalance,
    getCashBalances

}

export default reportService;