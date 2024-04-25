import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL
const API_URL = `/api/inv/sale/service`

const createSaleService = async(formData) => {
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    return response.data
}

const getSaleService = async () =>{
    const response = await axios.get(`${BACKEND_URL}${API_URL}`)
    return response.data
}


const saleServiceService = {
    createSaleService,
    getSaleService
}

export default saleServiceService;