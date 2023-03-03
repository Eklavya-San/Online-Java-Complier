import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Menu from './components/Batch/Menu'
function App() {
  return (
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
    </div>
  );
}
export default App;
