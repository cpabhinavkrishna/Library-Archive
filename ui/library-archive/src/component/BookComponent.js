import React, { useContext } from 'react'
import './BookComponent.css'
import { Link } from 'react-router-dom'
import { BookContext } from '../context/BookContext.js';
const BookComponent = (props) => {
 const {addToCart, removeFromCart} = useContext(BookContext);
  return (
    <div className='book'>
       <Link to={"/book/"+props.id}>
           <img src={props.banner} alt="posterimage"/>
           </Link>
           <button onClick={()=>addToCart(props.id)}>Add to cart</button> 
           <button onClick={()=>removeFromCart(props.id)}>Remove from cart</button>
    </div>
  )
}

export default BookComponent
