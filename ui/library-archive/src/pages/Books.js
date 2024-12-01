import React, {useEffect, useState } from 'react'
import './CSS/Books.css'
import BookComponent from '../component/BookComponent';
const Books = () => {
    const [allBooks,setAllBooks] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/allbooks').then(res=>res.json()).then(data=>setAllBooks(data));
    },[]);
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
