import {useState} from 'react'
import Axios from 'axios';
import React from 'react'
import FetchData from './components/FetchData';


function App(){
  const [code,setCode]=useState();
  const submit=()=>{
    setCode("class output{public static void main ( String [] args) {System.out.println(\"eklavya\");}}");
    let payload = {code:code , language : "java", input : ""};
    Axios.post('http://localhost:3000/',payload,(res)=>{
      document.write(res);
    });
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
      <FetchData></FetchData>
<br></br>
      </div>
    </div>
  )
    }
export default App;
