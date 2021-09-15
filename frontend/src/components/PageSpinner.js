import { Spinner } from 'react-bootstrap';

const loadingContainerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const loaderStyle = {
    height: '4rem',
    width: '4rem'
}

const PageSpinner = () => {
    return (
        <div style={loadingContainerStyle}>
            <Spinner style={loaderStyle} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default PageSpinner; 
