import React from "react";


function FetchData(){
    async function result(){
        const response = await fetch ('http://localhost:3000/');
        const json = await response.json();
        console.log(json.output);
        var output = json.output;
        document.getElementById("out").innerHTML=output;
    }
    return(
        <div>
            <textarea id="out" cols="70" rows="10"></textarea>
            <button onClick={result}>run</button>
        </div>
    );
}
export default FetchData;