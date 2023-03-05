import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateStudent = () => {
  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const id = JSON.parse(as);
  var pid = id.id;
  // const [pid, setpid] = useState(id.id);
  const history = useNavigate(); // Use useNavigate hook to get the history object

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect(() => {
    // Fetch student data from server using `id`
    fetch(`http://localhost:6969/student/findbyid/` + pid)
      .then(response => response.json())
      .then(data => {
        setFirstname(data.stdFirstname);
        setLastname(data.stdLastname);
        setEmail(data.stdEmail);
      })
      .catch(error => {
        console.error(`Error fetching student data for id=${pid}:`, error);
      });
  }, [pid]);

  const handleFirstNameChange = event => {
    setFirstname(event.target.value);
  };
  const handleLastNameChange = event => {
    setLastname(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const requestBody = {
      stdFirstname: firstname,
      stdLastname: lastname,
      stdEmail: email,
    };
    fetch(`http://localhost:6969/student/update/` + pid, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Student data updated:', data);
        toast.success('Student data updated:', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        history('/allbatches'); // Use history function to navigate on successful update
      })
      .catch(error => {
        console.error('Error updating student data:', error);

        toast.error('Error updating student  Please try again later', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div>
        {/* const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [maxMarks, setMaxMarks] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); */}


      <div className="container">
        <h1>Update Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
