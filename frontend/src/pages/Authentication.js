
import React from 'react';
import { SignupForm, LoginForm } from '../components';
import { 
    Tabs,
    Tab
} from 'react-bootstrap';

const containerStyle = {
    display: 'flex',
    backgroundColor: '#222831',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}

const Authentication = () => {
    return (
        <div style={containerStyle}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Sign up" title="Sign up">
                    <SignupForm />
                </Tab>
                <Tab eventKey="Login" title="Login">
                    <LoginForm />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Authentication;
