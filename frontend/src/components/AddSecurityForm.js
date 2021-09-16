
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddSecurityForm = (props) => {
    const { 
        modalTriggered,
        hide,
        info : {
            symbol
        }
    } = props.config;
    const portfolios = useSelector(state => state.portfolios);

    const renderPortfolios = (portfolios) => {
        if (portfolios.length === 0){
            return <div>No portfolios available</div>
        }
        const portfolioList = portfolios.map((portfolio) => 
            <option value={portfolio.id}>{portfolio.name}</option>
        );
        return portfolioList;
    };
    
    return (
        <Modal centered show={modalTriggered} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add security '{symbol}'</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Units</Form.Label>
                        <Form.Control type='units' placeholder='Number of units'/>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='price' placeholder='Price (average buy in)'/>
                        <Form.Label>Portfolios</Form.Label>
                        <Form.Select>
                            {renderPortfolios(portfolios)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success'>Create</Button>
            </Modal.Footer>
        </Modal>
    );  
};

export default AddSecurityForm; 