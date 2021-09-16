
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AddSecurityForm } from '.';

const cardStyle = {
    margin: '0 0 10px 0',
    borderRadius: '3px',
    padding: '15px 5px 15px 0'
}

const handleViewClick = (e, symbol) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('symbol', symbol);
    const newPath = `/dashboard/company?` + searchParams.toString(); 
    window.location = newPath;
};

const SymbolLookupCard = (props) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div style={cardStyle}>
            <Card className='shadow-sm' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.data.symbol}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.data.symbolType}</Card.Subtitle>
                    <Card.Text>
                        {props.data.description}
                    </Card.Text>
                    <Card.Link>
                        <Button onClick={(e) => handleViewClick(e, props.data.symbol)}>View more</Button>
                    </Card.Link>
                    <Card.Link>
                        <Button onClick={
                            () => {
                                setShowModal(true);
                            }
                        }>Add security</Button>
                        <AddSecurityForm config={{
                            modalTriggered: showModal,
                            hide: () => {setShowModal(false)}
                        }}/>
                    </Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SymbolLookupCard;