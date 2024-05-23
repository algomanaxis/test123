import React from 'react'
import Login from './Login'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserView from './components/UserView';





function App() {
  return (
    <>


    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/userView' element={<UserView/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
