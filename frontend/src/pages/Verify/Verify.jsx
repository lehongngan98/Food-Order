import React, { useContext, useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './Verify.css'
const Vefiry = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const status = searchParams.get("status");
    const app_trans_id = searchParams.get("apptransid");
    const {url} = useContext(StoreContext)
    const navigate = useNavigate();


    const vefiryPayment = async () =>{
      console.log(status,app_trans_id);
      const response = await axios.post(url+"/api/order/verify",{status,app_trans_id});
      console.log("respone :",response);
      if(response.data.success){
        navigate("/myorder");
      }else{
        navigate("/");
      }
    }

    useEffect(()=>{
      vefiryPayment();
    },[])



  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Vefiry