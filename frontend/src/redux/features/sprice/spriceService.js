import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL
const API_URL = `/api/price`
// Create New sprice

const createSprice = async (formData) => {
    const response = await axios.post(`${BACKEND_URL}${API_URL}`, formData)
    return response.data
}

// Get All sPrice

const getSprices = async () =>{
    const response = await axios.get(`${BACKEND_URL}${API_URL}`)
    return response.data
}

// Create New sprice
const updateSprice = async (_id, formData) => {
  try {
    console.log(_id);
    const response = await axios.put(`${BACKEND_URL}${API_URL}/${_id}`, formData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating sprice:", error);
    throw error;
  }
};


const spriceService = {
    createSprice,
    getSprices,
    updateSprice
}

export default spriceService