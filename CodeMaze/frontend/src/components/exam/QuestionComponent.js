import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function QuestionComponent(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    const url = `http://localhost:6969/exam/examquelist/${props.adminId}/${props.testId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, [props.adminId, props.testId]);

  const handleNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIndex);

  };
  function handleChange(queId) {
    props.onParamChange(queId);
  }
  const handlePrevQuestion = () => {
    const prevIndex = (currentQuestionIndex - 1 + questions.length) % questions.length;
    setCurrentQuestionIndex(prevIndex);

  };
  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">
          <h5>Question:</h5>
        </label>
        <textarea
          className="form-control"
          id="questionText"
          name="questionText"
          rows="6"
          value={questions[currentQuestionIndex].questionText}
          onChange={handleChange(questions[currentQuestionIndex].questionId)}
          readOnly
        />
      </div>
      <Button onClick={handlePrevQuestion}>Back</Button>
      &nbsp;
      <Button onClick={handleNextQuestion}>Next</Button>
    </div>
  );
}

export default QuestionComponent;
