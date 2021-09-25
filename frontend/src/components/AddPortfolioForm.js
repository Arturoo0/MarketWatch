
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddPortfolioForm = (props) => {
    const { 
        showCreateModal, 
        closeCreateModal, 
        onChangePortfolioName, 
        onChangePortfolioDescription,
        onChangePortfolioAccess,
        createPortfolioOnClick
    } = props.config;
    return (
        <Modal centered show={showCreateModal} onHide={closeCreateModal}>
            <Modal.Header closeButton>
                <Modal.Title>Portfolio Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='email' placeholder='Enter portfolio name' onChange={onChangePortfolioName}/>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='email' placeholder='Enter portfolio description' onChange={onChangePortfolioDescription} />
                        <Form.Label>Access</Form.Label>
                        <Form.Select onChange={onChangePortfolioAccess}>
                            <option value='private'>Private</option>
                            <option value='public'>Public</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={createPortfolioOnClick}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPortfolioForm;