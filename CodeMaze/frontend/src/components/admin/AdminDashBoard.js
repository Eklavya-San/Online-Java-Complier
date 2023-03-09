import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    <div><h1> AdminDashBoard</h1></div>
  )
}

export default AdminDashBoard