import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Books from './pages/Books';
import { useState } from 'react';
import BookContextProvider, { BookContext } from './context/BookContext';

function App() {
  const [user,setUser] = useState({});
  const [islogged,setIslogged] = useState(false);
  return (
      
    <div className="App">
      <BookContextProvider>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Books/>}/>
        <Route path="/book/:bookid" element={<h1>ak</h1>}/>
        <Route path="*" element={<h1>Sorry, page not found.</h1>}/>
      </Routes>
      </BookContextProvider>
    </div>
  );
}

export default App;
