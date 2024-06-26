import React, { Component } from 'react';
import { Card, Badge } from 'react-bootstrap';

class SingleBook extends Component {
    state = {
        selected: false,
    };

    handleClick = () => {
        console.log('Prima:', this.state.selected);
        this.setState((prevState) => ({
            selected: !prevState.selected,
        }), () => {
            console.log('Dopo:', this.state.selected);
        });
    };

    render() {
        const { book } = this.props;
        const { selected } = this.state;

        return (
            <Card
                className={`book-card mb-4 ${selected ? 'selected' : ''}`}
                onClick={this.handleClick}
                style={{
                    transition: 'all 0.3s ease',
                    border: selected ? '2px solid red' : '1px solid black', // Applica bordo rosso quando selected è true
                }}
            >
                <Card.Img
                    variant="top"
                    src={book.img}
                    className="img-fluid"
                    style={{ height: '600px', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="lead">Genre: {book.category}</Card.Text>
                    <Badge bg="dark">{book.price}€</Badge>
                </Card.Body>
            </Card>
        );
    }
}

export default SingleBook;
