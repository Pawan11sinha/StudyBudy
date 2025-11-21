import React from 'react'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
   


    <div className='w-screen min-h-screen bg-Apple Core-50 flex flex-col font-inter'>
     
  <Routes>
    <Route path="/" element={<Home/>}/>
   </Routes>
    </div>
  
  )
}

export default App;