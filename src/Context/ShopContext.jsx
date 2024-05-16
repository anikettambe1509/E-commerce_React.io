import React, { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product';
// import CartItems from '../Components/CartItems/CartItems';


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

// Cart Number 

let bagItems = [];


    function displayBagIcon() {
        let bagItemCountElement = document.querySelector('.bag-item-count');
        if (bagItems.length > 0) {
          bagItemCountElement.innerText = bagItems.length;
        //   bagItemCountElement.style.visibility = 'visible';
             bagItemCountElement.style.display = 'block';
             bagItemCountElement.style.color = "border 1px solid red"
        } else {
        //   bagItemCountElement.style.visibility = 'hidden';
             bagItemCountElement.style.display = 'none';
        }
      }

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    // console.log(cartItems);
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        console.log(cartItems);

        bagItems.push(itemId);
        displayBagIcon();
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            // console.log(getTotalCartAmount);  
        }
        return totalAmount; 
    }

    
    const contextValue = {getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;