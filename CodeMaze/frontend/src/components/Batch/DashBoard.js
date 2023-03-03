import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className='container'>DashBoard
      <Link to={`/studentsignup`}>
        <Button className='btn btn-edit' >Student Signup</Button>
      </Link>
<hr></hr>
      <Link to={`/studentlogin`}>
        <Button className='btn btn-edit' >Student Login</Button>
      </Link>
    </div>

  )
}

export default DashBoard