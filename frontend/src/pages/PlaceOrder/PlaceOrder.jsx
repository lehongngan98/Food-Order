import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext);

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  return (
    <form  className="place-order">
      <div className="place-order-left">
        <p className='title'>Nhập thông tin giao hàng</p>
        <input type="text" placeholder='Họ tên' />
        <input type="text" placeholder='Số điện thoại' />
        <input type="email" placeholder='Gmail' />
        <input type="text" placeholder='Địa chỉ' />
        <input type="text" placeholder='Ghi chú' />
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
          <button >Thanh Toán</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder