import Wrapper from "../assets/wrappers/Footer";
import Logo from "./Logo";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoPerson } from "react-icons/io5";
import {
  instagram,
  facebook,
  whatsapp,
  youtube,
  linkedin,
} from "../assets/images";
import { FooterLeftImg, FooterRightImg } from "../assets/images/landing-images";
import { useForm } from "react-hook-form";
import { sendFeedback } from "../config/routeApi/restaurant";

const Footer = () => {
  const { register, handleSubmit, errors } = useForm();
  const phoneNumber = "9150289762";
  const emailAddress = "mag@bromagindia.com";

  const onSubmit = async (data) => {
    console.log(data, "data");
    const response = await sendFeedback(data);
    console.log("Form submitted successfully:", data);
  };

  return (
    <Wrapper>
      <div className="background">
        <div className="content">
          <div className="details">
            <div className="detail-content">
              <h3>contact us</h3>
              <a href={`tel:${phoneNumber}`}>
                <p>
                  <BsFillTelephoneFill className="icon" />
                  +91 9150289762
                </p>
              </a>

              <a href={`mailto:${emailAddress}`}>
                <p>
                  <IoMail className="icon" />
                  mag@bromagindia.com
                </p>
              </a>

              <p>
                <FaLocationDot className="icon" />
                Chennai, Velachery
              </p>
              <div className="socials">
                <a href="#" target="blank">
                  <img src={instagram} alt="" />
                </a>
                <a href="#" target="blank">
                  <img src={facebook} alt="" />
                </a>
                <a href="#" target="blank">
                  <img src={whatsapp} alt="" />
                </a>
                <a href="#" target="blank">
                  <img
                    style={{ width: "45px", height: "45px", marginTop: "-7px" }}
                    src={youtube}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/bromagindia/mycompany/"
                  target="blank"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>

            <div className="detail-content">
              <h3>about us</h3>
              <p>Who we are</p>
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
            </div>

            <div className="detail-content">
              <Form className="footer-form">
                <h3>give your feedback</h3>
                <Form.Group>
                  <div className="input-div">
                    <IoPerson />
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Your Name"
                    />
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="input-div">
                    <IoMail />
                    <Form.Control type="email" placeholder="Enter Email" />
                  </div>
                </Form.Group>

                <Form.Group>
                  <div className="input-div">
                    <BsFillTelephoneFill />
                    <Form.Control
                      required
                      type="tel"
                      placeholder="Enter Your Phone Number"
                    />
                  </div>
                </Form.Group>

                <div className="message">
                  <Form.Group>
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Write Something"
                      rows={1.5}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        {/* <div className="detail-content">
          <h3>about us</h3>
          <p>Who we are</p>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div> */}

        {/* <div className="detail-content">
              <Form className="footer-form" onSubmit={handleSubmit(onSubmit)}>
                <h3>give your feedback</h3>

                <Form.Group>
                  <div className="input-div">
                    <IoPerson />
                    <Form.Control
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Enter Your Name"
                      ref={register({ required: "Name is required" })}
                    />
                  </div>
                  <Form.Text className="text-danger">
                    {errors.name?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <div className="input-div">
                    <IoMail />
                    <Form.Control
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Enter Email"
                      ref={register({
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <div className="input-div">
                    <BsFillTelephoneFill />
                    <Form.Control
                      name="phoneNumber"
                      type="tel"
                      id="phoneNumber"
                      placeholder="Enter Your Phone Number"
                      ref={register({
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                  </div>
                  <Form.Text className="text-danger">
                    {errors.phoneNumber?.message}
                  </Form.Text>
                </Form.Group>

                <div className="message">
                  <Form.Group>
                    <Form.Control
                      name="message"
                      as="textarea"
                      id="message"
                      placeholder="Write Something"
                      rows={1.5}
                      ref={register({ required: "Message is required" })}
                    />
                  </Form.Group>
                  <Form.Text className="text-danger">
                    {errors.message?.message}
                  </Form.Text>
                </div>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div> */}

        {/* <div className="detail-content">
              <form className="footer-form" onSubmit={handleSubmit(onSubmit)}>
                <h3>give your feedback</h3>

                <div>
                  <div className="input-div">
                    <IoPerson />
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Your Name"
                      {...register("name", {
                        required: true,
                        pattern: /^[a-zA-Z-' ]+$/,
                      })}
                      id="name"
                    />
                  </div>
                  <label className="text-danger">{errors.name?.message}</label>
                </div>

                <div>
                  <div className="input-div">
                    <IoMail />
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      })}
                      id="email"
                    />
                  </div>
                  <label className="text-danger">{errors.email?.message}</label>
                </div>

                <div>
                  <div className="input-div">
                    <BsFillTelephoneFill />
                    <input
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter Your Phone Number"
                      {...register("phoneNumber", {
                        required: true,
                        pattern: /^\d{10}$/,
                      })}
                      id="phoneNumber"
                    />
                  </div>
                  <label className="text-danger">
                    {errors.phoneNumber?.message}
                  </label>
                </div>

                <div className="message">
                  <div controlId="formBasicPassword">
                    <input
                      name="message"
                      as="textarea"
                      placeholder="Write Something"
                      rows={1.5}
                      {...register("message", {
                        required: true,
                      })}
                      id="message"
                    />
                  </div>
                  <label className="text-danger">
                    {errors.message?.message}
                  </label>
                </div>

                <button variant="primary" type="submit">
                  Submit
                </button>
              </form>
            </div> */}
        {/* </div>
        </div> */}

        <div className="logo">
          <Logo />
        </div>

        <div className="bg-images">
          <img src={FooterLeftImg} alt="" />
          <img src={FooterRightImg} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};
export default Footer;
