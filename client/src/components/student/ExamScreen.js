import React, { useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";

function ExamScreen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6969/showcategories",
        input,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      const data = response.data;
      const result = `${data.output}${data.error}`;
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
