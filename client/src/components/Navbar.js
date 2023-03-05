import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              <Link to="/">Form</Link>
            </th>
            <th>
              <Link to="/Console">Exam portal</Link>
            </th>
            <th>
              <Link to="/admin">admin</Link>
            </th>
            <th>
              <Link to="/TestInputForm">test add</Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Navbar