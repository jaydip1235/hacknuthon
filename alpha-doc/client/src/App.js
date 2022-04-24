import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Login from './components/jsx/Login';
import Register from './components/jsx/Register';
import Posts from './components/jsx/Posts';
import Upload from './components/jsx/Upload';
import PostPage from './components/jsx/PostPage';
import PostGallery from './components/jsx/PostGallery';
import Header from './components/jsx/Header';
import Footer from './components/jsx/Footer';

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Posts/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/upload' element={<Upload/>}/>
      <Route path='/post/:_id' element={<PostPage/>}/>
      <Route path='/editpost/:id' element={<Upload/>}/>
      <Route path='/ownposts' element={<PostGallery/>}/>
      <Route path="*" element={<Posts/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App