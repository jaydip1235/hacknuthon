import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import Join from './components/Join';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Join/>}/>
        {/* <Route path='/:codeId' element={<Home/>}/> */}
        <Route path="/room/:roomId" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App;