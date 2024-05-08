import express from 'express'
import authMiddleWare from '../middleware/auth.js'
import { Payment,Callback,Verify,userOrders } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/payment',authMiddleWare,Payment);
orderRouter.post('/callback',Callback);
orderRouter.post('/verify',Verify);
orderRouter.post('/user-orders',authMiddleWare,userOrders);



export default orderRouter;