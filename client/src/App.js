import {useState} from 'react'
import Axios from 'axios';
import React from 'react'
// import Javaoutput from './components/Javaoutput';
// import Just from './components/Just';
import Another from './components/Another';
// import MyCodeEditor from './components/MyCodeEditior';


function App(){

  const [code,setCode]=useState();
  
  const submit=()=>{
    let payload = {code:code};
    Axios.post('http://192.168.34.6:3000/',payload);
  }

 

  return (
    <div>
      <fieldset><h1>Online java Compiler</h1></fieldset>
      <div>
      <textarea name="code" id="t1" cols="70" rows="10" onChange={(event)=>{
        setCode(event.target.value);
      }}></textarea><br></br>
      <label htmlFor="code">Enter your code</label>
      <button type='button' onClick={submit}>Compile code</button>
      </div>
      <div >
      {/* <Javaoutput></Javaoutput> */}
      {/* <Just></Just> */}
      <Another></Another>
      {/* <MyCodeEditor></MyCodeEditor> */}
<br></br>
   
    
      </div>
    </div>
  )
    }
export default App;
