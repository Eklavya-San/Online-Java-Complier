import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className='container'>DashBoard

    <hr></hr>
    <h3>Student</h3>
      <Link to={`/studentsignup`}>
        <Button className='btn btn-edit' > Signup</Button>
      </Link>
      &nbsp;
      <Link to={`/studentlogin`}>
        <Button className='btn btn-edit' > Login</Button>
      </Link>
    </div>

  )
}

export default DashBoard