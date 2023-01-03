import React, { useState } from 'react';

function Another() {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch('http://localhost:3000/display');
    const json = await response.json();
    setData(json);
    document.getElementById('out').innerHTML = json.code;
  }

  function handlClick() {
    fetchData();
  }

  if (!data) {
    return (
      <div>
        <button onClick={fetchData}>Run Code</button>
      </div>
    );
  }

  return (

    <div>
      <button onClick={handlClick}>Run Code</button>
      <textarea id='out' cols="70" rows="10">
        <br></br>
      </textarea>
    </div>
  );
}

export default Another;