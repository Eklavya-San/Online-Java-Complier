import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const Remove = () => {
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
      const response = await fetch(`http://localhost:6969/batch/remove/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {

        throw new Error('Failed to delete batch');
      }
      toast.success('Batch deleted successfully', {
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
      toast.error('Error deleting batch. Please try again later.', {
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

  return null;
};

export default Remove;
