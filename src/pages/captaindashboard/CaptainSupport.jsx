import Wrapper from "../../assets/wrappers/Support"
import Card from "react-bootstrap/Card";
import { FaHeadset, FaWhatsapp } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";

const CaptainSupport = () => {

    const whatsappNumber = "9150289762";
    const phoneNumber = "9150289762";
    const emailAddress = "mag@bromagindia.com";

    return (
        <Wrapper className="page">
            <div className="page-content">
                <div className="page-header">
                    <h3>Support</h3>
                </div>

                <div className="card-deck">
                    <a href={`tel:${phoneNumber}`}>
                        <Card className="call-card" style={{ width: "18rem" }}>
                            <Card.Body>
                                <FaHeadset className="card-icon support" />
                                <Card.Title>Call Us</Card.Title>

                                <Card.Text>
                                    Having trouble? get in contact with us through call.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>

                    <a href={`https://wa.me/${whatsappNumber}`}>
                        <Card className="whatsapp-card" style={{ width: "18rem" }}>
                            <Card.Body>
                                <FaWhatsapp className="card-icon whatsapp" />
                                <Card.Title>Whatsapp Us</Card.Title>

                                <Card.Text>
                                    Having trouble? get in contact with us through whatsapp.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>

                    <a href={`mailto:${emailAddress}`}>
                        <Card className="mail-card" style={{ width: "18rem" }}>
                            <Card.Body>
                                <IoMailOutline className="card-icon mail" />
                                <Card.Title>Mail Us</Card.Title>

                                <Card.Text>
                                    Having trouble? get in contact with us through mail.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>
                </div>
            </div>
        </Wrapper>
    )
}
export default CaptainSupport