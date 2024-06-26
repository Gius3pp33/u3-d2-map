import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import SingleBook from './SingleBook';

const BookList = ({ books }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Row>
                {filteredBooks.map((book) => (
                    <Col md={4} key={book.asin} className="mb-4">
                        <SingleBook book={book} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default BookList;
