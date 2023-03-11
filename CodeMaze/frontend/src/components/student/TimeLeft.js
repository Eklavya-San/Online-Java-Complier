import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeLeft = (props) => {
  const testId = props.prop;
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(
    () => parseInt(localStorage.getItem('timeLeft')) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6969/test/findbyid/${testId}`);
        const data = await response.json();
        setTest(data);
        if (timeLeft === null) { // Check if timeLeft is not set in session local storage
          setTimeLeft(60 * data.testDuration); // Set to test duration if not set
        }
      } catch (error) {
        console.error('Error fetching test details:', error);
      }
    };
    fetchTestDetails();
  }, []);

  useEffect(() => {
    if (timeLeft !== null) {
      localStorage.setItem('timeLeft', timeLeft);
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        if (timeLeft === 5) {
          props.prop();
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeLeft, props.prop]);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate(`/studentlogin`);
      localStorage.removeItem('timeLeft');
    }
  }, [timeLeft, navigate]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!test || timeLeft === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Time left: {formatTime(timeLeft)}</p>
      {/* rest of the component code */}
    </div>
  );
};

export default TimeLeft;
