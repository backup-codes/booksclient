import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ManagementCard = ({ props }) => {
  return (
    <section className="sales-card-deck">
      {props.map((category) => (
        <div key={category._id} className="py-3">
          <h3>{category._id}</h3>
          <Container>
            <Row>
              {/* {category.items.map((item, index) => (
                <Card as={Col} md={"4"} key={index} className="sales-card">
                  <Card.Body>
                    <Card.Title className="sales-card-title">{item} per day</Card.Title>
                    <h2>34</h2>
                  </Card.Body>
                </Card>
              ))} */}
            </Row>
          </Container>
        </div>
      ))}
    </section>
  );
};

export default ManagementCard;
