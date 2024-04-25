import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL

const API_URL = `/api/inv/purchase`

// Create New Purchase

const createPurchase = async (formData) => {
    console.log(formData)
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    console.log(response)
    return response.data

}

// Get All purchase
const getPurchases = async () =>{
    const response = await axios.get(`${BACKEND_URL}${API_URL}`)
    return response.data
}

const purchaseService = {
    createPurchase,
    getPurchases
}

export default purchaseService;