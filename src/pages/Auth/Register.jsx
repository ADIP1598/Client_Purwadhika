import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import Axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const btnRegister = () => {
        if (username && email && password) {
            Axios.post(`http://localhost:3300/users/register`, {
                username, email, password
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        } else {
            alert("Please insert All data!")
        }

    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <h1> Register Page </h1>
                <div className='col-12'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={btnRegister} variant="primary">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;