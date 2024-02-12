
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountUp from 'react-countup';
const SalesManagementCard = (props) => {
    return (
        <section>
            <Container>
                <Row>
                  
                    {
                        props.arrayOfObjects.map((item, index) => {
                            return (

                                <Card as={Col} md={"4"} key={index} className="sales-card">

                                    {console.log(item)}
                                    <Card.Body>
                                        <Card.Title className="sales-card-title">
                                            {item.title}
                                        </Card.Title>
                                        <h1><CountUp duration={0.6} prefix="₹ " end={item.quantity}/></h1>
                                    </Card.Body>
                                    <div className="card-bg"></div>
                                </Card>

                            );
                        })
                    }

                </Row>
            </Container>
        </section>

    )
}
export default SalesManagementCard;