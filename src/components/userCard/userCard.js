// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard({name}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Description
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;