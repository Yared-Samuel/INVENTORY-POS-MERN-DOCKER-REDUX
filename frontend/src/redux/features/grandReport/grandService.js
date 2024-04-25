import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || process.env.TAILSCALE_BACKEND_URL
const API_URL = `/api/report/store-report`


const getGrandId = async (_id) => {
    const response = await axios.get(`${BACKEND_URL}${API_URL}/${_id}`);
    
    return response.data
}


const grandService = {
    getGrandId,
    
}

export default grandService