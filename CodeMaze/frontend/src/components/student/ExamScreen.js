import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";

function ExamScreen() {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  var url;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(data!==""){
        url=`http://localhost:6969/console/run/java/${data}`
      }else{
        url=`http://localhost:6969/console/run/java/""/`
      }
      const response = await axios.post(
        
        url,
        input,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      const responseData = response.data;
      const result = `${responseData.output}${responseData.error}`;
      setOutput(result);
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MonacoEditor
          language="java"
          theme="vs-dark"
          defaultValue='class Main {
  public static void main(String[] args) {
    System.out.println("hello World");
  }
}'
          value={input}
          onChange={setInput}
          width="100%"
          height="75vh"
          key="java-editor"
          options={{
            automaticLayout: true,
            fontFamily: "JetBrains Mono",
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            tabSize: 2,
            lineNumbers: "on",
            wordWrap: "on",
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <label>
        Input:
        <MonacoEditor
          language="text"
          theme="vs-dark"
          value={data}
          onChange={setData}
          width="32vh"
          height="25vh"
          key="data-editor"
          options={{
            automaticLayout: true,
            fontFamily: "JetBrains Mono",
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            tabSize: 2,
          }}
        />
      </label>
      <label>
        Output:
        <MonacoEditor
          language="text"
          theme="vs-dark"
          value={output}
          height="25vh"
          width="100vh"
          key="output-editor"
          options={{
            automaticLayout: true,
            fontFamily: "JetBrains Mono",
            fontSize: 14,
            readOnly: true,
            lineNumbers: "off",
            wordWrap: "on",
          }}
        />
      </label>
      
    </div>
  );
}

export default ExamScreen;
