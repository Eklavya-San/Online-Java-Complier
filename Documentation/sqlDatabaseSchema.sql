CREATE TABLE Admin (
    user_id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE Batch (
    batch_id INT PRIMARY KEY,
    batch_name VARCHAR(255)
);

CREATE TABLE Student (
    rollno INT PRIMARY KEY,
    prn VARCHAR(255) UNIQUE,
    batch_id INT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY (batch_id) REFERENCES Batch(batch_id)
);

CREATE TABLE Test (
    test_id INT PRIMARY KEY,
    test_name VARCHAR(255),
    duration INT,
    start_time DATETIME,
    end_time DATETIME
);

CREATE TABLE Question (
    question_id INT PRIMARY KEY,
    question_text TEXT,
    max_marks INT
);

CREATE TABLE Test_Case (
    case_id INT PRIMARY KEY,
    marks INT,
    solution TEXT,
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

CREATE TABLE Result (
    result_id INT PRIMARY KEY,
    test_id INT,
    user_id INT,
    total_marks INT,
    obtained_marks INT DEFAULT 0,
    FOREIGN KEY (test_id) REFERENCES Test(test_id),
    FOREIGN KEY (user_id) REFERENCES Student(rollno)
);

CREATE TABLE Question_Test_Case (
    question_id INT,
    case_id INT,
    PRIMARY KEY (question_id, case_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (case_id) REFERENCES Test_Case(case_id)
);

CREATE TABLE Test_Question (
    test_id INT,
    question_id INT,
    PRIMARY KEY (test_id, question_id),
    FOREIGN KEY (test_id) REFERENCES Test(test_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);
