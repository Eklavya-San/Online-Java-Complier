import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RemoveStudent = () => {
  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const pid = JSON.parse(as);
  var id = pid.id;
  const navigate = useNavigate();
  var count = 0;
  useEffect(() => {
    console.log('test');
    if (count === 0) {

      fetchData();
      count++;
    }
  });
  const fetchData = async () => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:6969/student/remove/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {

        throw new Error('Failed to delete student');
      }
      toast.success('Student deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/allbatches');

    } catch (error) {

      console.error(error);
      toast.error('Error deleting student. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/allbatches');
    }

  }

  return (
    <div>RemoveStudent</div>
  )
}

export default RemoveStudent