// import React, { useState } from 'react'
// import { Button, Table } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';

// const StudentDetails = () => {

//     const paramid = useParams();
//     var as = JSON.stringify(paramid);
//     const pid = JSON.parse(as);
//     var id = pid.id;
    
//     const [prn, setprn] = useState('');
//     const [roll, setroll] = useState('');




//     return (
//         <div>
//             <h1>Student Details </h1>

//             <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>PRN</th>
//             <th>Roll No</th>
//             <th>Email</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Batch Id</th>
//           </tr>
//         </thead>
//         <tbody>
//           {StudentDetails.map((Students) => (
//             <tr key={Students.stdPrn}>
//               <td data-toggle="tooltip" data-placement="top" title="click to check student details">
//                 <Link to={`/studentdetails/${Students.stdPrn}`}>
//                 {Students.stdPrn}
//                 </Link>
//               </td>
            
//               <td>{Students.stdRollno}</td>
//               <td>{Students.stdEmail}</td>
//               <td>{Students.stdFirstname}</td>
//               <td>{Students.stdLastname}</td>
//               <td>{Students.batchTbl.batchId}</td>
//               <td>
//                 <Link to={`/updatestudent/${Students.stdPrn}`}>
//                   <Button className='btn btn-edit' >Edit</Button>
//                 </Link>
//                 </td>
//                 <td>
//                 <Link to={`/deletestudent/${Students.stdPrn}`}>
//                   <Button className="btn btn-danger" >
//                     Delete
//                   </Button>
//                 </Link>
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </Table>

//         </div>
//     )
// }

// export default StudentDetails