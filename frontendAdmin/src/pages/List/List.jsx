import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import {assets} from '../../assets/assets'


const List = ({url}) => {
  
  const [list,setList] = useState([]);

  useEffect(()=>{
    const fetchList = async () =>{
      const response = await  axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if(response.data.success){
        setList(response.data.foods);
  
      }else{
        toast.error(response.data.message);
      }
    }
    fetchList();
  },[]);

  const removeFood = async (foodId) =>{
    console.log("foodId :",foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});

    if(response.data.success){
      const newList = list.filter(item => item._id !== foodId);
      setList(newList);
      console.log("delete successfull");
      toast.success(response.data.message);
    }else{
      console.log("delete error");
      toast.error(response.data.message);
    }
  }

  return (
    <div className='list add flex-col'>
      <p>Danh sách món ăn</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Hình ảnh</b>
          <b>Tên món ăn</b>
          <b>Mô tả</b>
          <b>Loại món ăn</b>
          <b>Giá</b>
          <b>Hoạt động</b>
        </div>
        {
          list.map((item,index) =>{
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })  
        }
      </div>
    </div>
  )
}

export default List