import { useState,createContext, useEffect } from "react";

export const BookContext = createContext(null);

const BookContextProvider = ({children})=>{
    let bookData;
    const appServerURL = process.env.REACT_APP_SERVER_URL;
    const [allBooks,setAllBooks] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
              const response = await fetch(appServerURL+'/allbooks');
              const result = await response.json();
              setAllBooks(result);
        }
        fetchData();
    },[]);
    // fetch(appServerURL+'/allbooks').then(res=>res.json()).then(data=>return data);

    
   
    const addToCart = (bookid)=>{
        setCartItems((prev) => {
            if (!prev.includes(bookid)) {
                return [...prev, bookid];
            }
            return prev;
        });
        console.log(cartItems);
        
    }
    const removeFromCart = (bookid)=>{
        setCartItems((prev)=>{
          return prev.filter((e)=>e!==bookid);
        });
        console.log(cartItems);
    }
    
    return(
        <BookContext.Provider value={{allBooks, bookData,addToCart,removeFromCart}}>
            {children}
        </BookContext.Provider>
        
    )
}

export default BookContextProvider