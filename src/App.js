import './App.css';
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import {books} from './data.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import {faBars, faShoppingCart, faTimes, faBolt, faBookOpen, faTags, faStar, faStarHalfAlt, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookInfo from './pages/BookInfo.jsx';
import Cart from './pages/Cart.jsx';
import { useEffect, useState } from 'react';


library.add(faBars, faShoppingCart, faTimes, faBolt, faBookOpen, faTags, faStar, faStarHalfAlt, faArrowLeft)


function App() {
  const [cart, setCart] = useState([])

  function addToCart(book) {
    const dupeItem = cart.find(item => +item.id === +book.id)
    if (dupeItem ) {
      setCart(cart.map(item => {
        if(item.id === dupeItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        else {
          return item
        }
      }))
    }
    else {
      setCart([...cart, {...book, quantity: 1}])
    }
    }

  function changeQuantity(book, quantity) {
    setCart(cart.map(item => 
      item.id === book.id ?
         {
          ...item,
          quantity: +quantity,
      }
      : item
    ))
  }

  function removeBook(book) {
    setCart(cart.filter(item => 
      (item.id !== book.id)))
  }

  function numberOfItems() {
    let counter= 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }


  useEffect(() => {
    console.log(cart)

  }, [cart])

  return (
    <Router>
    <div className="App">
      <Nav numberOfItems={numberOfItems()}/>
      <Routes>

      <Route path="/" exact element={<Home />} />
      <Route path='/books' Component={() => <Books books={books}/>} />
      <Route path='/books/:id' Component={() => <BookInfo books={books} addToCart={addToCart}/>}/>
      <Route path='/cart' Component={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeBook={removeBook}/>}/>
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
