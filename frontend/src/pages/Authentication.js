
import React from 'react';
import { SignupForm, LoginForm } from '../components';

const containerStyle = {
    display: 'flex',
    backgroundColor: 'gray',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
}

const Authentication = () => {
    return (
        <div style={containerStyle}>
            <LoginForm />
        </div>
    );
};

export default Authentication;
