import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteQuestion = () => {
  const params = useParams();
  const questionId = params.id;
  const navigate = useNavigate();
  let count = 0;

  useEffect(() => {
    if (count === 0) {
      fetchData();
      count++;
    }
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:6969/question/remove/${questionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      toast.success('Question deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/questiontable');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting question. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/questiontable');
    }
  }

  return null;
};

export default DeleteQuestion;
