
import React from 'react';
import { 
    Button
} from 'react-bootstrap'
import { BsArrowRight } from "react-icons/bs";


const signedOutContainerStyle = {
    display: 'flex',
    backgroundColor: '#222831',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
};

const warningCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '4px'
}

const buttonSpacingStyle = {
    margin: '10px 5px'
}

const redirectToAuthPage = (url) => {
    window.location.pathname = url;
}

const SignedOut = () => {
    return (
        <div style={signedOutContainerStyle}>
            <div style={warningCardStyle}>
                <h5>You must login or create an account</h5>
                <div>
                    <Button style={buttonSpacingStyle} onClick={e => redirectToAuthPage('/auth')}>
                        <BsArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignedOut;