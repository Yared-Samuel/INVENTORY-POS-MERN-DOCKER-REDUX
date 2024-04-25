import React, { useState } from 'react'
import { BiLogIn } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME, SET_ROLE } from '../../redux/features/auth/authSlice'
import './Login.css'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setformData] = useState(initialState)
  const {email, password} = formData

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setformData({...formData, [name]: value})
  };

  const login = async (e) => {
    e.preventDefault()
    
    if( !email || !password) {
      return toast.error("All fields are required!")
    }

    if(!validateEmail(email)) {
      return toast.error("Please enter valid email!")
    }
    const userData = {
      email, password
    }
    setIsLoading(true)
    try {
      const data = await loginUser(userData)
       dispatch(SET_LOGIN(true))
       dispatch(SET_NAME(data.name))
       dispatch(SET_ROLE(data.role))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      
    }
  }

  return (
    <div className='loginWholePage'>
    
    
    <div className='hotelContainer'>
    <h3 className='hotelAm'>በየነ ለዳ ሆቴል</h3>
    <h3 className='hotelEn'>BEYENE LEDA HOTEL</h3>
    </div>
    <div className='loginContainer'>
    {/* {isLoading && <Loader />} */}

    

        
        <div className='formContainer'>
       
        


          <div className='iconLogin'>
            <BiLogIn size={40} color='rgb(246, 231, 96)' />
          </div>
          {/* <h2>Login</h2> */}

          <form className='formLogin' onSubmit={login}>
            <input className='inputLogin' type='email' placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
            <input className='inputLogin' type='password' placeholder='Password' required name='password' value={password} onChange={handleInputChange}/>
            <button type='submit' className='LoginBtn'><span>LogIn</span></button>
          </form>
          <span className='register'>
          <p className='register'> Authorized personel only!</p>     
          
          </span>
        </div>
        
        <div className='footerContainer'>
  <footer className="footer">
    <div className="waves">
      <div className="wave" id="wave1"></div>
      <div className="wave" id="wave2"></div>
      <div className="wave" id="wave3"></div>
      <div className="wave" id="wave4"></div>
    </div>
    
    <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="https://t.me/Yaredsam">By YARED Samuel</a></li>
      <li className="menu__item"><a className="menu__link" href="https://t.me/Yaredsam">በ ያሬድ ሳሙኤል</a></li>
      <li className="menu__item"><a className="menu__link" href="https://t.me/Yaredsam">0920273746</a></li>
      <li className="menu__item"><a className="menu__link" href="https://t.me/Yaredsam">0901502216</a></li>
      <li className="menu__item"><a className="menu__link" href="https://t.me/Yaredsam">A.A</a></li>

    </ul>
    
    <p>&copy;2023 Yared Samuel | All Rights Reserved</p>
  </footer>
  
</div>
    </div>
    </div>
  )
}

export default Login