import React, { useContext } from 'react'
import axios from 'axios'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = React.useState("home")
    const { getTotalCartAmount, token, setToken ,url,setCartItems} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = async () => {      
        setCartItems({});          
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }
    return (
        <div className='navbar'>
            <Link to={"/"}><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}>

                    </div>
                </div>
                {
                    !token
                        ? <button onClick={() => setShowLogin(true)}>Sign in</button>
                        : <div className="navbar-profile">
                            <img src={assets.profile_icon} alt="" />
                            <ul className="nav-profile-dropdown">
                                <li onClick={()=>navigate("/myorder")}><img src={assets.bag_icon} alt="" />Orders</li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                            </ul>
                        </div>
                }
            </div>
        </div>

    )
}
Navbar.propTypes = {
    setShowLogin: PropTypes.func.isRequired
}

export default Navbar