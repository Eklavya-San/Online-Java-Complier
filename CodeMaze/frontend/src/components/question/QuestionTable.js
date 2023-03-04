import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuestionTable = () => {
  const [questions, setQuestions] = useState([]);
  const [filterType, setFilterType] = useState('questionId');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:6969/question');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast.error('Failed to fetch questions');
      }
    };
    fetchQuestions();
  }, []);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredQuestions = questions.filter((question) => {
    if (filterValue === '') {
      return true;
    }

    switch (filterType) {
      case 'questionId':
        return question.questionId.toString().includes(filterValue);
      case 'questionText':
        return question.questionText.toLowerCase().includes(filterValue.toLowerCase());
      case 'questionMarks':
        return question.questionMarks.toString().includes(filterValue);
      default:
        return true;
    }
  });

  return (
    <div>
      <h1>All Questions</h1>
      <div>
        <label htmlFor="filter-type">Filter by:</label>
        <select id="filter-type" value={filterType} onChange={handleFilterTypeChange}>
          <option value="questionId">Question ID</option>
          <option value="questionText">Question Text</option>
          <option value="questionMarks">Question Marks</option>
        </select>
        <input type="text" value={filterValue} onChange={handleFilterValueChange} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Question ID</th>
            <th>Question Text</th>
            <th>Question Marks</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question) => (
            <tr key={question.questionId}>
              <td>{question.questionId}</td>
              <td>{question.questionText}</td>
              <td>{question.questionMarks}</td>
              <td>
                <Link to={`/updatequestion/${question.questionId}`}>
                  <Button className="btn btn-edit">Edit</Button>
                </Link>
              </td>
              <td>
                <Link to={`/deletequestion/${question.questionId}`}>
                  <Button className="btn btn-danger">Delete</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     
    </div>
  );
};

export default QuestionTable;
