
import React, { useState } from 'react';
import { 
    Form,
    Button,
    Card
} from 'react-bootstrap';
import {
    get,
    post
} from '../utils/baseRequest.js'

const cardStyle = {
    padding: '10px 25px'
};

const pullFormData = async (credObj) => {
    console.log(credObj);
    console.log(await get());
}

const LoginForm = () => {
    const [enteredEmail, updateEnteredEmail] = useState();
    const [enteredUsername, updateEnteredUsername] = useState();
    const [enteredPassword, updateEnteredPassword] = useState();
     return (
        <Card style={cardStyle}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={e => updateEnteredEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="Enter username" 
                        onChange={e => updateEnteredUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={e => updateEnteredPassword(e.target.value)}
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={e => pullFormData({
                        email: enteredEmail,
                        username: enteredUsername,
                        password: enteredPassword
                    })}
                >
                    Submit
                </Button>
            </Form>
        </Card>
    );
};

export default LoginForm;