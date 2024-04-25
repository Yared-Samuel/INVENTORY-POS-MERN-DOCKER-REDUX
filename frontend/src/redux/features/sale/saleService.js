import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL

const API_URL = `/api/inv/sale`

// Create new sale

const createSale = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    return response.data
}

// Get all sales

const getSales = async ()=>{
    const response = await axios.get(`${BACKEND_URL}${API_URL}`)
    return response.data

}

const saleService = {
    createSale,
    getSales
}

export default saleService;