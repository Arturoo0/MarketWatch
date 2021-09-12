
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { post } from '../utils/baseRequest.js'
import { connect } from 'react-redux';
import { setAuthenticatedAction } from '../actions/authenticationActions.js';

const cardStyle = {
    padding: '10px 25px'
};

const attemptLogIn = async (credObj, successCallback) => {
    const { email, username, password } = credObj;
    const emailIsValid = email !== undefined;
    const usernameIsValid = username !== undefined;
    const passwordIsValid = password !== undefined;

    if (!(emailIsValid || usernameIsValid || passwordIsValid)) {
        return 'undefined value pass provided in credObj';
    }
    const res = await post('/auth/login', credObj);
    switch (res.status) {
        case 200:
            alert(res.data.message);
            successCallback();
            break;
        case 401:
            alert(res.errRes.message);
            break;
        default:
            break;
    }
}

const LoginForm = ({ dispatch }) => {
    const history = useHistory();
    const [enteredEmail, updateEnteredEmail] = useState();
    const [enteredUsername, updateEnteredUsername] = useState();
    const [enteredPassword, updateEnteredPassword] = useState();

    const logInSuccessCallback = () => {
        dispatch(setAuthenticatedAction(true));
        history.push('/dashboard');
    }

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
                    onClick={e => attemptLogIn({
                        email: enteredEmail,
                        username: enteredUsername,
                        password: enteredPassword
                    }, logInSuccessCallback)}
                >
                    Submit
                </Button>
            </Form>
        </Card>
    );
};

export default connect()(LoginForm);
