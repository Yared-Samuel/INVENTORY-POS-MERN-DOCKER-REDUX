import React, {useState} from 'react'
import { TiUserAddOutline } from "react-icons/ti"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME, SET_ROLE } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import './Login.css'

const initialState = {
  name: '',
  email: '',
  role: '',
  password: '',
  password2: '',
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)

  const {name, email,role, password, password2} = formData

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setformData({...formData, [name]: value})
  };

  const register = async (e) => {
    e.preventDefault()
    
    if(!name || !email || !password || !role) {
      return toast.error("All fields are required!")
    }
    if(password.length < 6){
      return toast.error("Password must be up to 6 character")
    }
    if(!validateEmail(email)) {
      return toast.error("Please enter valid email!")
    }
    if(password !== password2) {
      return toast.error("Password dont match")
    }
    const userData = {
      name, email, password, role
    }
    setIsLoading(true)

    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      await dispatch(SET_ROLE(data.role))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  };

  return (
    <div className="loginWholePage">
    <div className='hotelContainer'>
    
    <h3 className='hotelEn'>Register User</h3>
    </div>
    <div className='loginContainer'>
    
      {isLoading && <Loader />}
      
        <div className="formContainer">
       
          <div className='--flex-center'>
            <TiUserAddOutline size={40} color='rgb(246, 231, 96)'/>
          </div>
          

          <form className='formLogin' onSubmit={register}>
            <input className='inputLogin' type='text' placeholder='Name' required name='name' value={name} onChange={handleInputChange}/>
            <input className='inputLogin' type='email' placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
            <select className='select' value={role} onChange={handleInputChange}  name='role' required>
                  <option disabled value={""}>Role for users</option>
                  <option  value={"admin"}>Admin - ዋና አስተዳዳሪ</option>
                  <option  value={"storeMan"}>Store Man - ስቶር</option>
                  <option  value={"barMan"}>Bar Man - ባር</option>
                  <option  value={"finance"}>Finance - ሂሳብ ክፍል</option>                
                </select>
            <input className='inputLogin' type='password' placeholder='Password' required name='password' value={password} onChange={handleInputChange}/>
            <input className='inputLogin' type='password' placeholder='Confirm Password' required name='password2' value={password2} onChange={handleInputChange}/>
            <button type='submit' className='LoginBtn'>Register</button>
          </form>
          <span className='register'>
          <Link to="/dashboard">To Dashboard</Link>
          </span>
          
          </div>
        </div>
          
      
    </div>
  )
}

export default Register