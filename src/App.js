import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Event from './components/Event'
import Manage from './components/Manage'
import Book from './components/Book'
import Order from './components/Order'

const App = () => {
  return (
    <Router>
    <Navbar/>

    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/event' element={<Event/>}/>
       <Route path='/slot' element={<Manage/>}/>
       <Route path='/book' element={<Book/>}/>
       <Route path='/order' element={<Order/>}/>
    </Routes>

    </Router>
  )
}

export default App