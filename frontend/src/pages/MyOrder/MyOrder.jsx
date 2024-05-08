import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './MyOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
const MyOrder = () => {
    const [data, setData] = useState([]);
    const {url,token} = useContext(StoreContext)

    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }


    const fetchOrders = async () =>{
        const response = await axios.post(url+"/api/order/user-orders",{},{headers:{token}});
        const ordersWithData = response.data.data.map(order => ({
            ...order,
            items: JSON.parse(order.items[0]) // Assuming there's only one item per order
        }));
        setData(ordersWithData);
        console.log("orders :", ordersWithData);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }   console.log("data orders :",data.items);
    },[token])
  return (
    <div className="my-orders">
        <h2>Danh sách đơn hàng:</h2>

        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.items.map((item,index)=>{
                                    if(index === order.items.length - 1){
                                        return item.name +" : " +item.quantity
                                    }else{
                                        return item.name +" : " +item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p>{formatVND(order.amount)}</p>
                            <p><b>{order.status}</b></p>
                            <button>Theo dõi đơn hàng</button>

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrder