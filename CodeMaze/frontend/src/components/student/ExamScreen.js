import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
import QuestionComponent from "../exam/QuestionComponent";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TimeLeft from "./TimeLeft";

function ExamScreen() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const adminId = 1;
  const paramid = useParams();
  var as = JSON.stringify(paramid);
  const id = JSON.parse(as);
  var testId = id.id;

  var stdId = user.userId;
  const [queId, setQueId] = useState(0);
  var url;
  const [response, setresponse] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const endExam = () => {
    alert('Exam ended');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/studentdashboard');
  }

  const analyze = async () => {
    try {
      url = `http://192.168.1.36:6969/exam/submitanswer/${adminId}/${stdId}/${testId}/${queId}/java`;
      console.log(input);
      const respo = await axios.patch(url, input, {
        headers: {
          'Content-Type': 'plain/text',
          'Authorization': token
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
      console.log(input);
      const response = await axios.post(url, input,
        {
          headers: {
            "Content-Type": "plain/text",
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

      <TimeLeft prop={testId} props={endExam} />
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
            <p>Obtained Marks: {response.data.queObtainedMarks}</p>


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
          width="95vh"
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
