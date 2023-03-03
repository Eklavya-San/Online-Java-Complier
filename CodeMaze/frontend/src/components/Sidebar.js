import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AdminDashBoard from './AdminDashBoard';
import ConsoleScreen from './ConsoleScreen';
import Navbar from './Navbar';
import TestInputForm from './TestInputForm';

const Sidebar = (props) => {
  return (
    <div>
      

        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/Console" exact element={<ConsoleScreen />}></Route>
          <Route path ="/admin" element={<AdminDashBoard/>} />
          <Route path ="/testinputform" element ={<TestInputForm/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Sidebar