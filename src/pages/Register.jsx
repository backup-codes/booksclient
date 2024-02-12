import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Wrapper from '../assets/wrappers/LoginStyle';
import axios from "axios";
// import API_URL from '../../config/global';

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phonenumber: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             `${API_URL}/signin/verify`, formData
    //         );
    //         console.log(response);
    //         if (response.data === true) {
    //             alert("Registration link sent to your email id")
    //         } else if (response.data === false) {
    //             alert("user already exists");
    //         }
    //     } catch (e) {
    //         console.error("Error during registration", e);
    //     }
    //     // console.log(formData);



    // };

    return (
        <Wrapper>
            <Container>
                <h1>Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='form-row'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className='form-row'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className='form-row'>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
                    </Form.Group>
                    <br />
                    <Button variant="dark" type="submit">Register</Button>
                    <p className='one'>Already have an account ?<Link to="/login"> Login</Link></p>
                    <div className='backhome'><Link to="/"> Back Home</Link></div>
                </Form>
            </Container>
        </Wrapper>
    )
}
export default Register