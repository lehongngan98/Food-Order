import { useContext, useEffect, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Login = ({ setShowLogin }) => {
    const { url ,token,setToken ,setEmail} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Đăng ký")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value })
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Đăng nhập") {
            newUrl += "/api/user/login";
        }
        else {
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);            
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
            setEmail(data.email);
        }

    }



    return (
        <div className="login">
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-input">
                    {
                        currState === "Đăng nhập" ? <></> : <input name='name' onChange={onChangHandler} value={data.name} type="text" placeholder='Họ Tên' required />
                    }
                    <input name="email" onChange={onChangHandler} value={data.email} type="email" placeholder='Gmail' required />
                    <input name="password" onChange={onChangHandler} value={data.password} type="password" placeholder='Mật khẩu' required />
                </div>
                <button type='submit'>{currState === "Đăng ký" ? "Đăng ký" : "Đăng nhập"}</button>
                {
                    currState === "Đăng ký" ?
                        <p>Bạn đã có tài khoản? <span onClick={() => setCurrState("Đăng nhập")}>Đăng nhập</span></p> :
                        <p>Bạn chưa có tài khoản? <span onClick={() => setCurrState("Đăng ký")}>Đăng ký</span></p>
                }
            </form>

        </div>
    )
}



export default Login    