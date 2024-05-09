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
  try {
    const response = await axios.post(url + "/api/order/list");
    if (response.data.success) {
      const ordersWithData = response.data.data.map(order => ({
        ...order,
        items: order.items.length ? JSON.parse(order.items[0]) : [] // Add a check for empty or undefined items
      }));
      setOrders(ordersWithData);
    } else {
      toast.error("Lỗi");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Lỗi khi tải danh sách đơn hàng.");
  }
}

  

  const statusHandler = async (event,app_trans_id) =>{
    const response = await axios.post(url+"/api/order/update-status",{
      app_trans_id:app_trans_id,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }else{
      alert("cập nhật thất bại!");
    }
  }

  useEffect(() => {
    fetchAllOrders();
    console.log("order :",orders);
  }, [orders])


  return (
    <div className="order-add">
      <h2>Danh sách đơn hàng:</h2>
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
              <select onChange={(event) =>statusHandler(event,order.app_trans_id)} value={order.status}>
                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                <option value="Xuất kho">Xuất kho</option>
                <option value="Đang trên đường giao hàng">Đang trên đường giao hàng</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders