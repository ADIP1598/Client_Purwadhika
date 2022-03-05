import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onBtLogin = () => {
        Axios.post(`http://localhost:3300/users/login`, {
            email,
            password,
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: "USER_LOGIN", payload: res.data.dataLogin })
            })
            .catch((err) => {
                console.log(err)
            })


    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <h1> Login Page </h1>
                <div className='col-12'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={onBtLogin} variant="primary">
                            Login
                        </Button>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit", fontWeight: 700, fontSize: 20 }}>Trash Can</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;