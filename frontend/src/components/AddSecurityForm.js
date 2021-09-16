
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddSecurityForm = (props) => {
    const { 
        modalTriggered,
        hide 
    } = props.config;
    return (
        <Modal centered show={modalTriggered} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Portfolio Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='email' placeholder='Enter portfolio name'/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='email' placeholder='Enter portfolio description' />
                        <Form.Label>Access</Form.Label>
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