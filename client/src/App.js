import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Menu from './components/Batch/Menu'
import Sidebar from './components/Batch/Sidebar';
import FrontPage from './components/common/FrontPage'
function App() {
  return (
    <div >
       {/* <Sidebar/> */}
       <div className="container">
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Menu />

    <FrontPage/>
      
      
       </div>
     
    </div>
  );
}
export default App;
