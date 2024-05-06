import mongooes from'mongoose'
const userSchema = new mongooes.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    cartData:{type:Object,default:{}},  
},{minimize:false})

const userModel =mongooes.model.user || mongooes.model('user',userSchema)

export default userModel