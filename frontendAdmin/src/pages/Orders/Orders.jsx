import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Orders.css'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'


const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
  const fetchAllOrders = async () => {
    const response = await axios.post(url + "/api/order/list");
    if (response.data.success) {
      const ordersWithData = response.data.data.map(order => ({
        ...order,
        items: JSON.parse(order.items[0]) // Assuming there's only one item per order
      }));
      setOrders(ordersWithData);
    }
    else {
      toast.error("Lỗi")
    }
  }

  useEffect(() => {
    fetchAllOrders();

  }, [orders])


  return (
    <div className="order-add">
      <h2>Order Page</h2>
      <div className="order-list">
        {
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " : " + item.quantity;
                      }
                      else {
                        return item.name + " : " + item.quantity + ", ";
                      }
                    })
                  }
                </p>

              </div>
              <p className="order-item-name">{order.address.hoTen}</p>
              <p className="order-item-address">{order.address.diaChi}</p>
              <p className="order-item-phone">{order.address.soDienThoai}</p>
              <p>Số lượng:{order.items.length}</p>
              <p>{formatVND(order.amount)}</p>
              <select>
                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                <option value="Xuất kho">Xuất kho</option>
                <option value="Đang trên đường giao hàng">Đang trên đường giao hàng</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders