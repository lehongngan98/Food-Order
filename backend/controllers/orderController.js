import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import "dotenv/config";
import CryptoJS from "crypto-js";
import moment from "moment/moment.js";
import axios from "axios";
import qs from "qs";

// config zalopay
const config = {
  app_id : "2553",
  key1 : "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2 : "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
}


const Payment = async (req,res) => {
    const embed_data = {
        //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
        redirecturl: 'http://localhost:5173/verify',
      };
      const userId = req.body.userId;
      const items = req.body.items;
      const address = req.body.address;
      const amount = req.body.amount;
      const transID = Math.floor(Math.random() * 1000000);
    
      console.log(config.endpoint);

      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: userId,
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        address:address,
        amount: amount,
        //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
        //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
        //lệnh iterm: ngrok http http://locahost:3000
        callback_url: 'https://55e8-2405-4803-d754-c7b0-85cb-c839-dc15-3600.ngrok-free.app/api/order/callback',
        description: `${userId} thanh toán hoá đơn #${transID}`,
        bank_code: '',
      };
    
      console.log("order data :",order);
    
      // appid|app_trans_id|appuser|amount|apptime|embeddata|item
      const data =
      order.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data,config.key1).toString();
    
      try {
        const result = await axios.post(config.endpoint, null, { params: order });
        const newOrder = new orderModel({
          app_id : order.app_id,
          app_trans_id : order.app_trans_id,
          app_user : order.app_user,
          app_time : order.app_time,
          items : order.item,
          amount : order.amount,
          address : order.address,
          description : order.description,
          payment :  false
        })
        await newOrder.save();
    
    
        return res.status(200).json(result.data);
      } catch (error) {
        console.log(error);
      }
}

const Callback =async (req,res) =>{
    let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
}



const Verify = async (req, res) => {
    const { app_trans_id, status } = req.body;
    console.log("verify payment: ", app_trans_id, status);
    try {
      if (status == 1) {
        await orderModel.findOneAndUpdate({ app_trans_id: app_trans_id }, { payment: true });
        return res.json({ success: true, message: "Paid" });
      } else {
        await orderModel.findOneAndDelete({ app_trans_id: app_trans_id });
        return res.json({ success: false, message: "Not Paid" });
      }
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, message: "Error verify" });
    }
  };


const CheckOrderStatus = async (req, res) => {
    const app_trans_id = req.body.app_trans_id;
  
    let postData = {
      app_id: config.app_id,
      app_trans_id: app_trans_id, // Input your app_trans_id
    };
  
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
    let postConfig = {
      method: "post",
      url: "https://sb-openapi.zalopay.vn/v2/query",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(postData),
    };
  
    try {
      const response = await axios(postConfig);
      console.log(response.data);
      return res.status(200).json({ success: true, data: response.data });
      /**
       * kết quả mẫu
        {
          "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
          "return_message": "",
          "sub_return_code": 1,
          "sub_return_message": "",
          "is_processing": false,
          "amount": 50000,
          "zp_trans_id": 240331000000175,
          "server_time": 1711857138483,
          "discount_amount": 0
        }
      */
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
  };


const userOrders = async(req,res) =>{
  try {
    const orders = await orderModel.find({app_user:req.body.userId});
    console.log("user orders:",orders);
    return res.status(200).json({success:true,data:orders});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({success:false,message:"Error"})
  }
}

export {
    Payment,
    Callback,
    Verify,
    CheckOrderStatus,
    userOrders
}

