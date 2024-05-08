import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// const PlaceOrder = async (req,res) => {
//     const frontend_URL = "http://localhost:3000";
//     try {
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })
//         await newOrder.save()
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity

//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         return res.json({success:true,session_url:session.url})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({success:false,message:"Internal Server Error"})
//     }
// }


const PlaceOrder = async (req,res) => {
    
}

export {
    PlaceOrder
}

