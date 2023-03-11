import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
// import Menu from './components/Batch/Menu' 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/common/Navigation';
function App() {
  return (
    <div className="container">
      <BrowserRouter>
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
          <Navigation/>
          {/* <Menu /> */}

        </div>

      </BrowserRouter>

    </div>
  );
}
export default App;
