import React from 'react'
import {  logoutUser } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, selectName, selectRole } from '../../redux/features/auth/authSlice';
import "./Header.css"
import { FaUserCircle} from "react-icons/fa"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName)
  const role = useSelector(selectRole)

  const goToRegister = () =>{
    navigate("/register")
  }
  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false))
    navigate("/login")


  }
  
  return (
    <div className='headerContainer'>
        <div className='headerInfoContainer'>

            <h3 className='headerUserInfo' onClick={goToRegister}>
                <span className='headerUserIcon'><FaUserCircle /></span>
                <span className='headerName'>{name} -</span>
                <span className='headerRole'>-{role}</span>
                
            </h3>
            
            
            <button onClick={logout} className='--btn --btn-danger headerButton'>Logout</button>
            
            
        </div>
        <hr />
    </div>
  )
}

export default Header