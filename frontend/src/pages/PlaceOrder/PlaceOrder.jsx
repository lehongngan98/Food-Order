import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,url,cartItems,setCartItems , email} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data,setData] = useState({
    hoTen:"",
    soDienThoai:"",
    gmail:"",
    diaChi:"",
    ghiChu:""
  })

  const onChangeHandler = (e) => {
    const name= e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value})
  }

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  const PlaceOrder = async (e) =>{
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
        
    })
    const orderData = { 
      userId:email,    
      items:orderItems,
      amount:getTotalCartAmount()+25000,
      address:data
    }
    
    if(!token){
      alert("Bạn chưa đăng nhập!");
      
    }else if(getTotalCartAmount == 0){
      alert("Bạn chưa chọn món!");
      navigate("/cart")
    }

    let res = await axios.post(url+"/api/order/payment",orderData,{headers:{token}});
    console.log("res:",res);
    if(res.status===200){
      // removefromcart
      setCartItems({});

      const session_url = res.data.order_url;      
      window.location.replace(session_url);

      

    }else{
      
      alert("error")
    }
  }



  return (
    <form onSubmit={PlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className='title'>Nhập thông tin giao hàng</p>
        <input required name='hoTen' value={data.hoTen} onChange={onChangeHandler} type="text" placeholder='Họ tên' />
        <input required name='soDienThoai' value={data.soDienThoai} onChange={onChangeHandler} type="text" placeholder='Số điện thoại' />
        <input required name='gmail' value={data.gmail} onChange={onChangeHandler} type="email" placeholder='Gmail' />
        <input required name='diaChi' value={data.diaChi} onChange={onChangeHandler} type="text" placeholder='Địa chỉ' />
        <input required name='ghiChu' value={data.ghiChu} onChange={onChangeHandler} type="text" placeholder='Ghi chú' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Thông tin đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tiền đặt món</p>
              <p>{formatVND(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{formatVND(getTotalCartAmount()===0?0:25000)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Thành tiền</p>
              <p>{formatVND(getTotalCartAmount()===0?0:getTotalCartAmount()+25000)}</p>
            </div>
          </div>
          <button type='submit'>Thanh Toán</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder