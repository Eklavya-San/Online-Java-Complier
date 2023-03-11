import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileUploadComponent from '../Batch/FileUploadComponent'
const AdminDashBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  return (
    <div> 
      
      </div>
  )
}

export default AdminDashBoard

// const token = localStorage.getItem("token");

// fetch('https://example.com/run', {
//     method: 'POST',
//     body: JSON.stringify(requestBody),
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//     }
// })