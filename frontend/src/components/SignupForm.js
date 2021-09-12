import React, { useState } from 'react';
import { 
    Form,
    Button,
    Card
} from 'react-bootstrap';
import {
    post
} from '../utils/baseRequest.js'

const cardStyle = {
    padding: '10px 25px'
};

const pullFormData = async (credObj) => {
    const {email, username, password} = credObj;
    const emailIsValid = email !== undefined; 
    const usernameIsValid = username !== undefined;
    const passwordIsValid = password !== undefined;

    if (!(emailIsValid || usernameIsValid || passwordIsValid)){
        return 'undefined value pass provided in credObj';
    }
    const res = await post('/auth/sign-up', credObj);
    switch (res.status){
        case 201:
            alert(res.data.message);
            break;
        case 409:
            alert(res.errRes.message);
            break;
        case 400:
            alert(res.errRes.message)
            break;
        default:
            break;
    }
}

const SignupForm = () => {
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
                    type="button" 
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

export default SignupForm;