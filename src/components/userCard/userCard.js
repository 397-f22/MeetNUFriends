import { Card, Badge, Image,Container, Row,Col } from "react-bootstrap";
import "./userCard.css";

function UserCard({ name, interests, currentUserInterests }) {
  return (
    <Card style={{ width: "20rem", height:"8rem" }}>
      <Card.Body>

        <Container>
          <Row>
          <Col xs={3} md={3}>
            <Image fluid roundedCircle width="50" src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"/>
          </Col>
          <Col xs={8} md={8} className="my-auto">
            <Card.Title className="my-auto mx-auto">{name}</Card.Title>
          </Col>
          </Row>
        </Container>
      
        <Card.Text className="mt-1">
        Some description about the user 
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
