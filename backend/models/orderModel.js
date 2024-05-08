import mongooes from 'mongoose'

const orderSchema = new mongooes.Schema({
    app_id:{type:String,required:true},
    app_trans_id:{type:String,required:true},
    app_user:{type:String,required:true},
    app_time:{type:Date,default:Date.now},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    description:{type:String,required:true},
    status: {type:String,default:"Đang chuẩn bị"},   
    payment:{type:Boolean,default:false},
})

const orderModel = mongooes.model.order || mongooes.model("order",orderSchema);
export default orderModel