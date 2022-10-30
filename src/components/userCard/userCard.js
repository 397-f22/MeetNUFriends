import { Card, Badge } from "react-bootstrap";

function UserCard({ name, interests }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {interests
            ? interests.map((interest) => (
                <Badge key={interest} pill bg="primary">
                  {interest}
                </Badge>
              ))
            : null}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
