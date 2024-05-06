import userModal from '../models/userModel.js';

// add item to user cart
const addToCart = async (req,res) =>{
    try {

        let userData = await userModal.findOne({_id:req.body.userId});
        
        if(userData){
            let cartData = await userData.cartData;            
            if(!cartData[req.body.itemId]){
                cartData[req.body.itemId] = 1;
            }else{
                cartData[req.body.itemId] += 1;
            }

            await userModal.findByIdAndUpdate(req.body.userId,{cartData});
            console.log("userdata:",userData);
            res.json({success:true,message:"Item added to cart!"});
        }else{
            res.json({success:false,message:" User  not found!"});
        }
    } catch (error) {
        res.json({success:false,message:"Error add to cart!"});
    }
}

//remove item to user cart
const removeToCart = async (req,res) =>{
    
}


// fetch user cart data
const getCart = async (req,res) =>{

}


export {addToCart,removeToCart,getCart}