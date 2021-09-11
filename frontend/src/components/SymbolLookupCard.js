
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const cardStyle = {
    margin: '0 0 10px 0',
    borderRadius: '3px',
    padding: '15px 5px 15px 0'
}

const SymbolLookupCard = (props) => {
    return (
        <div style={cardStyle}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.data.symbol}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.data.symbolType}</Card.Subtitle>
                    <Card.Text>
                        {props.data.description}
                    </Card.Text>
                    <Card.Link href="#"><Button>View more</Button></Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SymbolLookupCard;