
import React, { useState } from 'react'


const AddStudent = () => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [prn, setprn] = useState('');
  const [rollno, setrollno] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [batchid, setbatchid] = useState('');

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const requestBody  = {
      std_prn : prn,
      std_email:email,
      std_firstname:firstname,
      std_lastname:lastname,
      std_rollno:rollno,
      std_password:password,
      batch_id:batchid
    }
    try{
      const response = await fetch ('https://localhost:3000/signup',{
        method:'post',
        body : JSON.stringify(requestBody),
        headers:{
          'Content-Type' : 'application/json',
        },
      });

      const data = await response.json();
      console.log('Student data sent :',data);
      setprn('');
      setbatchid('');
      setemail('');
      setfirstname('');
      setrollno('');
      setlastname('');
      setpassword('');
      setpassword('');
      alert('new student added');

    }catch(error){
      setprn('');
      setbatchid('');
      setemail('');
      setfirstname('');
      setlastname('');
      setrollno('');
      setpassword('');
      setpassword('');
      console.error('Error sending form data ',error);
      alert('student adding failed');
    }
  }

  const handlePrnChange =(event)=>{
    setprn(event.target.value)
  }
  const handleEmailChange =(event)=>{
    setemail(event.target.value)
  }
  const handlePasswordChange=(event)=>{
    setpassword(event.target.value)
  }
  const handleRollnoChange=(event)=>{
    setrollno(event.target.value)
  }
  const handleFirstnameChange=(event)=>{
    setfirstname(event.target.value)
  }
  const handleLastnameChange=(event)=>{
    setlastname(event.target.value)
  }
  const handleBatchidChange=(event)=>{
    setbatchid(event.target.value)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="prn" className="form-label">PRN</label>
          <input type="text" className="form-control" id="prn" value={prn} onChange={handlePrnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="rollno" className="form-label">Roll No</label>
          <input type="text" className="form-control" id="rollno" value={rollno} onChange={handleRollnoChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstname" value={firstname} onChange={handleFirstnameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastname" value={lastname} onChange={handleLastnameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="batchid" className="form-label">Batch ID</label>
          <input type="text" className="form-control" id="batchid" value={batchid} onChange={handleBatchidChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}

export default AddStudent
