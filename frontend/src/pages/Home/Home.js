import React from 'react' 
import {RiProductHuntLine} from "react-icons/ri"
import {Link} from 'react-router-dom'
import "./Home.scss"
import heroImg from '../../assets/inv-img.png'
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink'


const Home = () => {
  return (
    <div className='home'>
      <nav className='container --flex-between'>
        <div className='logo'>
          <RiProductHuntLine size={35} />
        </div>
        <ul className='home-links'>
        <ShowOnLogout>
          <li>
            <Link to="/register">Register</Link>
          </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className='--btn --btn-primary'>
              <Link to="/login">Login</Link>
            </button>
          </li>
          </ShowOnLogout>
          <ShowOnLogin>
          <li>
            <button className='--btn --btn-primary'>
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
          </ShowOnLogin>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className='container hero'>
        <div className='hero-text'>
          <h2>Beyene Leda Inventory Managment System</h2>
          <p>Inventory managment system to manage the whole stores and products. And 
          reporting system for sales, purchase, transactions and so on...
          </p>
          <div className='hero-buttons'>
          <button className='--btn --btn-secondary'>
              <Link to="/dashboard">Overview Trial</Link>
            </button>
          </div>
          <div className='--flex-start'>
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className='hero-image'>
          <img src={heroImg} alt='Inventory' />
        </div>
      </section>
    </div>
  )
};

const NumberText = ({num, text}) => {
  return (
    <div className='--mr'>
      <h3 className='--color-white'>{num}</h3>
      <p className='--color-white'>{text}</p>
    </div>
  )
};

export default Home