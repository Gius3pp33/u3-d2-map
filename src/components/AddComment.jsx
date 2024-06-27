import React, { Component } from 'react';

class AddComment extends Component {
    state = {
        comment: '',
        rate: 1,
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { comment, rate } = this.state;
        const { book, refreshComments } = this.props;

        const newComment = {
            comment,
            rate: rate.toString(),
            elementId: book.asin,
        };

        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4',
                },
                body: JSON.stringify(newComment),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            this.setState({ comment: '', rate: 1 });
            refreshComments();
        } catch (error) {
            console.log('Errore:', error);
        }
    };

    render() {
        const { comment, rate } = this.state;

        return (
            <div className="add-comment">
                <h4>Add a Comment</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            name="comment"
                            className="form-control"
                            value={comment}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rate">Rating:</label>
                        <select
                            id="rate"
                            name="rate"
                            className="form-control"
                            value={rate}
                            onChange={this.handleChange}
                            required
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddComment;
