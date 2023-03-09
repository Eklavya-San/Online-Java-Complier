import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RemoveTestCase = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userrole !== 'ROLE_ADMIN') {
      toast.error('You do not have permission to access this page.');
      navigate('/studentdashboard');
    }
  }, [navigate]);
  const { id } = useParams();
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
      const response = await fetch(`http://localhost:6969/testcase/remove/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete test case');
      }
      toast.success('Test case deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/testcases');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting test case. Please try again later.', {
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

export default RemoveTestCase;
