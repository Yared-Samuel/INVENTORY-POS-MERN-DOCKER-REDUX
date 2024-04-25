import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL
const API_URL = `/api/products`
const API_URL_finished = `/api/products/finished`
const API_URL_raw = `/api/products/raw`
const API_URL_fixed = `/api/products/fixed`
const API_URL_use = `/api/products/use`
const API_URL_other = `/api/products/other`


// Create New Product

const createProduct = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    return response.data
}

// Get all products
const getProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL}`)
    return response.data
}
// Get Product by type
const getFinishedProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL_finished}`)
    return response.data
}
const getRawProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL_raw}`)
    return response.data
}
const getFixedProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL_fixed}`)
    return response.data
}
const getUseAndThrowProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL_use}`)
    return response.data
}
const getOtherProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}${API_URL_other}`)
    return response.data
}

const productService = {
    createProduct,
    getProducts,
    getFinishedProducts,
    getRawProducts,
    getFixedProducts,
    getUseAndThrowProducts,
    getOtherProducts
}

export default productService;
