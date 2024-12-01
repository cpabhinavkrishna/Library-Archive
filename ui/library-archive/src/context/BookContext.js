import { useState,createContext } from "react";

export const BookContext = createContext(null);

const BookContextProvider = ({children})=>{
    const [cartItems,setCartItems] = useState([]);
    const addToCart = ()=>{alert("ak")}
    const removeFromCart = ()=>{console.log("ak")}
    return(
        <BookContext.Provider value={{cartItems,addToCart,removeFromCart}}>
            {children}
        </BookContext.Provider>
    )
}

export default BookContextProvider