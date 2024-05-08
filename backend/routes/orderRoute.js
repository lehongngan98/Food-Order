import express from 'express'
import authMiddleWare from '../middleware/auth.js'
import { Payment,Callback,Verify,userOrders, ListOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/payment',authMiddleWare,Payment);
orderRouter.post('/callback',Callback);
orderRouter.post('/verify',Verify);
orderRouter.post('/user-orders',authMiddleWare,userOrders);
orderRouter.post('/list',ListOrders);
orderRouter.post('/update-status',updateStatus);



export default orderRouter;