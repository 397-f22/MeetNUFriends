import { Card, Badge, Image, Container, Row, Col } from "react-bootstrap";

function drawStars(similarity){
  let sim = Math.round(similarity);
  let stars = [];
  for (let i = 0; i < sim; i++){
    stars.push("⭐️")
  }
  return stars;
}

function UserCard({color, description, name, email, interests, similarity }) {
  
  return (
    <Card>
      <Card.Body>
        <Container>
          <Card.Header style={{backgroundColor:`${color}`}}>
          <Row bg='light'>
            <Col xs={3} md={1}>
              <Image fluid roundedCircle width="50" src="/user.png" />
            </Col>
            <Col xs={8} md={10} className="my-auto">
              <Card.Title className="my-auto mx-auto">{name}</Card.Title>
              <a href={`mailto:${email}`}  
                 style={{textDecoration:"none"}}>
                 {email} 
              </a>
              <div className="mt-1">Similarity: {drawStars(similarity)}</div>
            </Col>
          </Row>
          </Card.Header>
        </Container>

    <Container >
      <Row>
        <div className="my-3">
          {description ?? <h6 className="text-muted"><i>User has no description</i></h6>}
        </div>
        
        <div className="user-interests-container">
          {interests ? (
            interests.map((interest) => (
              <Badge
                className="user-interests"
                key={interest}
                pill>
                {interest}
              </Badge>
            ))
            ) : (
              <p className="user-interests-warning">No interests added yet</p>
              )}
        </div>
      </Row>
    </Container>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
