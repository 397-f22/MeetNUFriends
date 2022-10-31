import { Card, Badge, Image, Container, Row, Col } from "react-bootstrap";

function UserCard({ name, interests, currentUserInterests }) {
  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={3} md={1}>
              <Image fluid roundedCircle width="50" src="/user.png" />
            </Col>
            <Col xs={8} md={10} className="my-auto">
              <Card.Title className="my-auto mx-auto">{name}</Card.Title>
            </Col>
          </Row>
        </Container>

        <Card.Text className="mt-1">
          <div>
            User description goes here. In the future, each user will have the
            ability to write a short description about themselves to let other
            students know more about themselves.
          </div>
          <div className="user-interests-container">
            {interests ? (
              interests.map((interest) => (
                <Badge
                  className="user-interests"
                  key={interest}
                  pill
                  bg="primary"
                >
                  {interest}
                </Badge>
              ))
            ) : (
              <p className="user-interests-warning">No interests added yet</p>
            )}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
