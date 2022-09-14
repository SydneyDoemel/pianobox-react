import React, { Component } from 'react'
import Contact from './views/Contact'
import './App.css';
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom'
import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'
import ToDoList from './views/ToDoList'
import UpdatePost from './views/UpdatePost'
import SinglePost from './views/SinglePost'
import Shop from './views/Shop'
import Cart from './views/Cart'
import SingleItem from './views/SingleItem'
import SynthTest from './views/SynthTest';
import SavedBlobs from './views/Profile';
import Profile from './views/Profile';
import { useState, useEffect } from 'react';
import Audiotry from './views/Audiotry';
import Footer from './components/Footer';
import Profile2 from './views/Profile2';
import Settings from './views/Settings';





export default function App() {

  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage())
  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  return (
    <BrowserRouter >
             <div className='app-body'>
               <Nav user={user} logMeOut={logMeOut}/>
          
               <Routes >
                 <Route path='/' element={<Home user={user}/>}/>
                 <Route path='/contact' element={<Contact/>}/>
                 <Route path='/news' element={<News/>}/>
                 <Route path='/feed' element={<IG/>}/>
                 <Route path='/login' element={<Login logMeIn={logMeIn}/>}/>
                 <Route path='/signup' element={<SignUp/>}/>
                 <Route path='/posts/create' element={<CreatePost user={user}/>}/>
                 <Route path='/posts/update/:postId' element={<UpdatePost user={user}/>} />
                 <Route path='/posts/:postId' element={<SinglePost user={user}/>}/>
                 <Route path='/todo' element={<ToDoList />} />
                 <Route path='/shop' element={<Shop user={user}/>} />
                 <Route path='/profile' element={<Profile user={user}/>}/>
                 <Route path='/profile2' element={<Profile2 user={user}/>}/>
                 <Route path='/piano' element={<SynthTest user={user}/>}/>
                 <Route path='/audiotry' element={<Audiotry user={user}/>}/>
                 <Route path='/cart' element={<Cart user={user}/>} />
                 <Route path='/shop/:itemId' element={<SingleItem />} />
                 <Route path='/settings' element={<Settings logMeOut={logMeOut} user={user}/>} />
              
            
               </Routes>
               </div>
              <Footer />
             
           </BrowserRouter>
  )

}