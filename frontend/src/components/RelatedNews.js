
import React from 'react';
import { Card, Button } from 'react-bootstrap'; 

const cardStyle = {
    border: 'none',
    margin: '0 0 15px 0',
    display: 'flex',
    flexDirection: 'row',
    height: '200px'
};

const imgStyle = {
    width: 'auto', 
    margin: '0 15px 0 0'
}

const cardBodyStyle = {
    padding: '0 0',
    margin: 'auto 0'
};

const newsContainerStyle = {
}

const RelatedNews = (props) => {
    const renderArticles = () => {
        if (props.news === null) return null;
        const res = props.news.data.companyNews.res.map(article => 
            <div>
                <Card style={cardStyle}>
                    {
                        article.image === '' ?
                        null 
                        :
                        <Card.Img style={imgStyle} src={article.image} />
                    }
                    <Card.Body style={cardBodyStyle}>
                        <Card.Title>{article.headline}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{article.source}</Card.Subtitle>
                        <Card.Text>
                            {
                                article.summary.length > 100 ? 
                                article.summary.substring(0, 100) + '...'
                                :
                                article.summary
                            }
                        </Card.Text>
                        <Card.Link href={article.url}>
                            <Button variant='dark'>  
                                View
                            </Button>
                        </Card.Link>
                    </Card.Body>
                </Card>        
            </div>
        )

        return res; 
    };

    return (
        <div>
            <div style={newsContainerStyle}>
                <h3>Related news</h3>
                {renderArticles()}    
            </div>
        </div>
    );
}

export default RelatedNews;