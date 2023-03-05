import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const StudentMenu = () => {
  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/studentdetails/:id" exact element={<StudentDetails />} />
          <Route path="/studentsignup" exact element={<Signupp />} />
          <Route path="/studentlogin" exact element={<StudentLogin />} />
          <Route path="/deletestudent/:id" exact element={<RemoveStudent />}></Route>
          <Route path="/updatestudent/:id" exact element={<UpdateStudent />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default StudentMenu