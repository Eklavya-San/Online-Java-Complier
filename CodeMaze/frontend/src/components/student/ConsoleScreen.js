// import React, { useState, useEffect } from 'react';
// import MonacoEditor from '@monaco-editor/react';

// const ConsoleScreen = () => {
//     //for code,input,output and question
//     const [code, setCode] = useState('');
//     const [input, setInput] = useState('');
//     const [output, setOutput] = useState('');
//     const [questionText, setQuestionText] = useState('');

//     //for testcases if passed or not count
//     const [testCaseCount, setTestCaseCount] = useState(0);
//     const [passedCount, setPassedCount] = useState(0);
//     const [failedCount, setFailedCount] = useState(0);
//     const [checkBoxes, setCheckBoxes] = useState([]);
//     //submit button functionality sending all code to url so checking code for various testcase if cases run or fail and should response of of how many test-cases passed and how many failed checkboxes for the same
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const requestBody = {
//             input: input
//         };
//         console.log(input);
//         const response = await fetch('http://localhost:6969/showcategories', {
//             method: 'POST',
//             body: input,
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         });
//         const data = await response.json();
//         setTestCaseCount(data.testCaseCount);
//         setPassedCount(data.passedCount);
//         setFailedCount(data.failedCount);
//         setCheckBoxes(new Array(data.testCaseCount).fill(false));
//     };

//     const handleCheckBoxChange = (index) => {
//         const newCheckBoxes = [...checkBoxes];
//         newCheckBoxes[index] = !newCheckBoxes[index];
//         setCheckBoxes(newCheckBoxes);
//     };
//     const handleCodeChange = (value, event) => {
//         setCode(value);
//     };

//     const handleInputChage = (event) => {
//         setInput(event.target.value);
//     }

//     const handleRunClick = () => {
//         const requestBody = {
//             code: code,
//             language: 'java',
//             input: input
//         };

//         fetch('http://localhost:6969/showcategories', {
//             method: 'POST',
//             body: input,
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         })
        
       
//             .then(response => response.text())
//             .then(data => setOutput(data))
//             .catch(error => console.error(error));
//     };

//     useEffect(() => {
//         fetch('http://localhost:6969/question/findbyid/1')
//             .then(response => response.text())
//             .then(data => setQuestionText(data.questionText))
//             .catch(error => console.error(error));
//     }, []);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
//             <div style={{ flexGrow: 1 }}>
//                 <MonacoEditor
//                     language="java"
//                     theme="vs-dark"
//                     defaultValue='class Main {
//   public static void main(String[] args) {
//     System.out.println("hello World");
//   }
// }'
//                     width="100%"
//                     value={code}
//                     height="75vh"
//                     onChange={handleCodeChange}
//                     options={{
//                         automaticLayout: true,
//                         fontFamily: 'JetBrains Mono',
//                         fontSize: 14,
//                         formatOnPaste: true,
//                         formatOnType: true,
//                         suggestOnTriggerCharacters: true,
//                         tabSize: 2,
//                         lineNumbers: 'on',
//                         wordWrap: 'on'
//                     }}
//                 />
//                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                     <div style={{ flexBasis: '50%', paddingRight: '1rem' }}>
//                         <label htmlFor="input-box">Input:</label>
//                         <input id="input-box" type="text" value={input} onChange={handleInputChage} style={{ width: '100%', height: '100%' }} />
//                     </div>
//                     <div className="col-2">
//                         <button className="btn btn-primary float-right" onClick={handleRunClick}>
//                             Run
//                         </button>
//                         <button className="btn btn-primary" type="submit" onClick={handleSubmit} >Submit</button>
//                     </div>
//                     <div style={{ flexBasis: '50%', paddingLeft: '1rem' }}>
//                         <label htmlFor="output-box">Output:</label>
//                         <textarea id="output-box" value={output} readOnly style={{ width: '100%', height: '100%' }} />
//                     </div>
//                 </div>
//             </div>
//             <div style={{ flexBasis: '30%', paddingLeft: '1rem' }}>
//                 <label htmlFor="question-box">Question:</label>
//                 <textarea id="question-box" value={questionText} readOnly style={{ width: '95%', height: '70%' }} />
//                 {/* this is for testcases  will recieve response of how many test-cases passed and how many failed checkboxes for the same*/}
//                 {testCaseCount > 0 && (
//                     <div>
//                         <p>{passedCount} of {testCaseCount} test cases passed.</p>
//                         <p>{failedCount} of {testCaseCount} test cases failed.</p>
//                         {checkBoxes.map((isChecked, index) => (
//                             <div key={index}>
//                                 <label>
//                                     Case {index + 1}:
//                                     <input type="checkbox" checked={isChecked} onChange={() => handleCheckBoxChange(index)} />
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>


//         </div>
//     );
// };

// export default ConsoleScreen;
