import React, { useContext } from 'react'
import './BookComponent.css'
import { Link } from 'react-router-dom'
import { BookContext } from '../context/BookContext.js';
const BookComponent = (props) => {
  return (
    <div className='book'>
       <Link to={"/book/"+props.id}>
           <img src={props.banner} alt="posterimage"/>
           </Link>
           <button onClick={()=>{addToCart();}}>Add to cart</button>
           {/* onClick={()=>{addToCart(props.id);}} */}
    </div>
  )
}

export default BookComponent
