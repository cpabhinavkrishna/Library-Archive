import React, {useContext, useEffect, useState } from 'react'
import './CSS/Books.css'
import BookComponent from '../component/BookComponent';
import { BookContext } from '../context/BookContext';
const Books = () => {
   const {allBooks}  = useContext(BookContext);
   
  return (
    <div className="books">
      <section className='herosection'>
        <h1>Library Archive</h1>
      </section>
      <section className='cardsection'>
       { allBooks&&allBooks.map(e=><BookComponent key={e.id} id={e.id} title={e.title} banner={e.banner} />)}
      </section>
    </div>
  )
}

export default Books
