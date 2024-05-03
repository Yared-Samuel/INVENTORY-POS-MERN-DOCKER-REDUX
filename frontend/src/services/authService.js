import axios from "axios";
import {toast} from "react-toastify"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
// const TAILSCALE_BACKEND_URL = process.env.TAILSCALE_BACKEND_URL
const cookie =  document.cookie
// console.log("first")
// console.log(cookie)
const token = localStorage.getItem('token');
// const URL_options = [
//     BACKEND_URL,
//     TAILSCALE_BACKEND_URL

// ]

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

//Register User
export const registerUser = async (userData) => {
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, {withCredentials: true})
        if(response.statusText === "OK") {
            toast.success("User registered successfully")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()

            toast.error(message)
    }
}

//Login User
export const loginUser = async (userData) => {
    try {

        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`,userData
        );
        if (response.statusText === "OK") {
            toast.success("Login Successful");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`)
        
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()

            toast.error(message)
    }
}

// Get login status

export const getLoginStatus = async () => {
    try {
        
        console.log(BACKEND_URL)
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
};
// export const getLoginStatus = async () => {
//     try {
//         for (const url of URL_options) {
//                 if (!url) continue; 
//                 console.log(`Trying URL: ${url}`);
//                 const response = await axios.get(`${url}/api/users/loggedin`);
//                 if(response.data) {
//                     return response.data;
//                 }
                
//             }
        
//     } catch (error) {
//         // Handle the error
//         const message = error.message || 'An error occurred while retrieving login status';
//         toast.error(message);
//     }
// };