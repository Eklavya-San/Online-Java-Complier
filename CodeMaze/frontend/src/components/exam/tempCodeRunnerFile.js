 const handleStudentChange = (event) => {
    const studentId = Number(event.target.value);
    if (event.target.checked) {
      setStdIds((prevStdIds) => [...prevStdIds, studentId]);
    } else {
      setStdIds((prevStdIds) =>
        prevStdIds.filter((id) => id !== studentId)
      );
    }
  };
