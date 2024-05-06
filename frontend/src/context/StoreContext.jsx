import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

import PropTypes from "prop-types";
import axios from "axios";

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:3000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const fetchListFood = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.foods);
    }

    useEffect(() => {
        async function loadData() {
            await fetchListFood();
            // khi thoát khỏi tab mà chưa đăng xuất 
            // thì vào lại sẽ còn trạng thái đã đăng nhập
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
        console.log("food list:",food_list);
    }, [])

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems({ ...cartItems, [itemId]: 1 })
        }
        else {
            setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
        }
    }
    const removeFromCart = (itemId) => {

        setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 })

    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let totalInfo = food_list.find((product) => product._id === item);
                total += totalInfo.price * cartItems[item];

            }
        }
        return total;
    }





    const contextValue = {
        food_list: food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url: url,
        token,
        setToken
    }
    // console.log("contextValue :", food_list);
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default StoreContextProvider;