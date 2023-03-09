import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Menu from './components/Batch/Menu'
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="container">
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
      <BrowserRouter>
      
      <Menu />
      </BrowserRouter>

      
      
       </div>
     
    </div>
  );
}
export default App;
