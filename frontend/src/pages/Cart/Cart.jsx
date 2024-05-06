import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, food_list, removeFromCart ,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate();

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Mặt hàng</p>
          <p>Tên món</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Huỷ</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            console.log("cart items:", cartItems);
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{formatVND(item.price)}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{formatVND(item.price * cartItems[item._id])}</p>
                    <p onClick={()=>removeFromCart(item._id)} className="cross">X</p>
                  </div>
                  <hr />
                </div>

              )
            }

          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Thông tin giỏ hàng</h2>
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
          <button onClick={()=>navigate("/order")}>Tiến hành thanh toán</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nhập mã giảm giá (nếu có)</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Mã khuyến mãi'/>
              <button>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart