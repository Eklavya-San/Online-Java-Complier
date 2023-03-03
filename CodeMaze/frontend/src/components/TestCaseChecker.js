import React, { useState } from 'react';

function TestCaseChecker() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [testCaseCount, setTestCaseCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [checkBoxes, setCheckBoxes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      code: code,
      language: 'java',
      input: input
    };
    const response = await fetch('url', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setTestCaseCount(data.testCaseCount);
    setPassedCount(data.passedCount);
    setFailedCount(data.failedCount);
    setCheckBoxes(new Array(data.testCaseCount).fill(false));
  };

  const handleCheckBoxChange = (index) => {
    const newCheckBoxes = [...checkBoxes];
    newCheckBoxes[index] = !newCheckBoxes[index];
    setCheckBoxes(newCheckBoxes);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Code:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <label>
          Input:
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {testCaseCount > 0 && (
        <div>
          <p>{passedCount} of {testCaseCount} test cases passed.</p>
          <p>{failedCount} of {testCaseCount} test cases failed.</p>
          {checkBoxes.map((isChecked, index) => (
            <div key={index}>
              <label>
                Case {index + 1}:
                <input type="checkbox" checked={isChecked} onChange={() => handleCheckBoxChange(index)} />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestCaseChecker;
