import React, { useState, useEffect } from 'react';

function Just() {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch('http://localhost:3000/display');
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    if (data) {
      fetchData();
      console.log(data);
      document.getElementById('out').innerHTML=data.code;

    }
  }, [data]);

  if (!data) {
    return (
      <div>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
    );
  }

  return (
    <div>
      
      <textarea id='out' cols="70" rows="10">
    
    </textarea>
      
    </div>
  );
}

 export  default Just;