import {useState} from 'react'
import Axios from 'axios';
import React from 'react'
// import Javaoutput from './components/Javaoutput';
import Just from './components/Just';


function App(){

  const [code,setCode]=useState();
  
  const submit=()=>{
    let payload = {code:code};
    Axios.post('http://localhost:3000/',payload);
  }

 

  return (
    <div>
      <div>
      <textarea name="code" id="t1" cols="70" rows="10" onChange={(event)=>{
        setCode(event.target.value);
      }}></textarea><br></br>
      <label htmlFor="code">Enter your code</label>
      <button type='button' onClick={submit}>submit your code</button>
      </div>
      <div >
      {/* <Javaoutput></Javaoutput> */}
      <Just></Just>
      
<br></br>
   
    
      </div>
    </div>
  )
    }
export default App;
