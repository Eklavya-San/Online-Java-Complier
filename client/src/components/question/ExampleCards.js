import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ExampleCards = () => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Card Title 1</Card.Title>
          <Card.Text>
            This is a sample card description for card 1.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Card Title 2</Card.Title>
          <Card.Text>
            This is a sample card description for card 2.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Card Title 3</Card.Title>
          <Card.Text>
            This is a sample card description for card 3.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExampleCards;
