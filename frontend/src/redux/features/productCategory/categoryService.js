import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL
const API_URL = `/api/category`


// Create product Category

 const createProdCat = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    return response.data
}

// Get All Product Category

const getProdCat = async () => {
   const response = await axios.get(`${BACKEND_URL}${API_URL}`)
   return response.data
}

 const cateogryService = {
    createProdCat,
    getProdCat
 }

export default cateogryService