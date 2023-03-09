import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
import QuestionComponent from "../exam/QuestionComponent";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ExamScreen() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const adminId = 1;
  const  paramid = useParams();
  var as=JSON.stringify(paramid);
   const id = JSON.parse(as);
   var testId = id.id;
  
  var stdId = user.userId;
  const [queId, setQueId] = useState(0);
  var url;
  const [response, setresponse] = useState("");


  const analyze = async () => {
    try {
      url = `http://localhost:6969/exam/submitanswer/${adminId}/${stdId}/${testId}/${queId}/java`;
      const respo = await axios.patch(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setresponse(respo);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuesId = (queId) => {
    setQueId(queId);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data !== "") {
        var url = `http://localhost:6969/console/run/java/${data}`
      } else {
         url = `http://localhost:6969/console/run/java/""/`
      }
      const response = await axios.post(url,input,
        {
          headers: {
            "Content-Type": "application/json",
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
          width="70%"
          height="50vh"
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
        {response.data !== undefined && (
          <div>{console.log(response.data)}
            <p>Failed test cases: {response.data.failCount}</p>
            <p>Passed test cases: {response.data.passCount}</p>
            <p>Obtained Mraks{response.data.queObtainedMarks}</p>


          </div>
        )}
        <hr></hr>
        <QuestionComponent adminId={adminId} testId={testId} onParamChange={handleQuesId} />

        <hr></hr>
        <Button type="submit">Run</Button>
        &nbsp;
        <Button type="button" onClick={analyze}>Submit</Button>
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
