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
                <span className='headerName'>{name}</span>
                
            </h3>
            
            
            <span className='headerRole'>{role}</span>
            <button onClick={logout} className='--btn --btn-danger --btn-sm headerButton'>Logout</button>

            
            
        </div>
    </div>
  )
}

export default Header