import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendCredentials() {
  const [isSending, setIsSending] = useState(false);

  const handleSendCredentials = () => {
    setIsSending(true);
    fetch('http://localhost:6969/sendemailToStudent', {
      method: 'GET',
    })  
      .then((response) => {
        setIsSending(false);
        if (!response.ok) {
          throw new Error('Failed to send credentials.');
        }
      })
      .then((data) => {
        console.log('Send credentials success:', data);
        toast.success('Credentials sent successfully!');
      })
      .catch((error) => {
        console.error('Send credentials error:', error);
        toast.error('Failed to send credentials!');
      });
  };

  return (
    <div>
      <Button onClick={handleSendCredentials} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Credentials'}
      </Button>
    </div>
  );
}

export default SendCredentials;
