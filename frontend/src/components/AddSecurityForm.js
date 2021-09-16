
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { post } from '../utils/baseRequest';

const AddSecurityForm = (props) => {
    const [enteredUnits, setEnteredUnits] = useState();
    const [enteredPrice, setEnteredPrice] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState();
    const { 
        modalTriggered,
        hide,
        info : {
            symbol
        }
    } = props.config;
    const portfolios = useSelector(state => state.portfolios);
    const userId = useSelector(state => state.app.userId);

    const renderPortfolios = (portfolios) => {
        if (portfolios.length === 0){
            return <div>No portfolios available</div>
        }
        const portfolioList = portfolios.map((portfolio) => 
            <option value={portfolio.id}>{portfolio.name}</option>
        );
        return portfolioList;
    };

    const pullAddSecurityData = async () => {
        await post(`/users/${userId}/portfolios/create`, {
            units: enteredUnits,
            price: enteredPrice,
            portfolio: selectedPortfolio 
        });
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
                        <Form.Control onChange={e => setEnteredUnits(e.target.value)} type='units' placeholder='Number of units'/>
                        <Form.Label>Price</Form.Label>
                        <Form.Control onChange={e => setEnteredPrice(e.target.value)} type='price' placeholder='Price (average buy in)'/>
                        <Form.Label>Portfolios</Form.Label>
                        <Form.Select onChange={e => setSelectedPortfolio(e.target.value)}>
                            {renderPortfolios(portfolios)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {pullAddSecurityData()}} variant='success'>Create</Button>
            </Modal.Footer>
        </Modal>
    );  
};

export default AddSecurityForm; 