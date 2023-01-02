import React,{useState,useEffect} from 'react'

function Javaoutput(){
    const [data,setData]=useState(null);

    useEffect(
        ()=>{
            async function fetchData(){
                const response = await fetch('http://localhost:3000/display',{ mode :'no-cors'});
                console.log("inside fetch data :"+response.json);
                const json = await response.json();
                
                setData(json);
        }
        fetchData();
        },[]);
    if(!data){
        
        return <p>Loading...</p>
    }
    return (
        <div>
            {
                data.map(()=>(
                    <p>{data.code}</p>
                ))
            }
        </div>
    )
}

export default Javaoutput;