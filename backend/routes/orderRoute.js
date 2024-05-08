import express from 'express'
import authMiddleWare from '../middleware/auth.js'
import { PlaceOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post('/placeorder',authMiddleWare,PlaceOrder);


export default orderRouter;