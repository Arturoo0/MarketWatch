
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddSecurityForm = (props) => {
    const { 
        modalTriggered,
        hide,
        info : {
            symbol
        }
    } = props.config;
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
                            <option value='private'>Private</option>
                            <option value='public'>Public</option>
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