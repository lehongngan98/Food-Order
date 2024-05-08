import userModal from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);

    if (userData) {
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }

      await userModal.findByIdAndUpdate(req.body.userId, { cartData });
      console.log("add cart userdata:", userData);
      res.json({ success: true, message: "Item added to cart!" });
    } else {
      res.json({ success: false, message: " User  not found!" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error add to cart!" });
  }
};

//remove item to user cart
const removeToCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    if (userData) {
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId]) {
        cartData[req.body.itemId] -= 1;
        if (cartData[req.body.itemId] == 0) {
          delete cartData[req.body.itemId];
        }
        
      }else{
        console.log("Item not found in cart!");
        return  res.json({ success: false, message: "Item not found in cart!" });
      }

      await userModal.findByIdAndUpdate(req.body.userId, { cartData });
      console.log("remove cart userdata:", userData);
      return res.json({ success: true, message: "Item removed from cart!" });
    }
  } catch (error) {
    console.log("Error remove cart userdata");
    return res.json({ success: false, message: "Error Item removed from cart!" });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId);
        if (userData) {
            let cartData = await userData.cartData;
            console.log("get cart userdata:", userData);
            return res.json({ success: true, message: "Cart data fetched!", data: cartData });
        } else {
            return res.json({ success: false, message: "User not found!" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error fetching cart data!" });
    }
};

export { addToCart, removeToCart, getCart };
