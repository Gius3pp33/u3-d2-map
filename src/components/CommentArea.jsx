import React, { Component } from 'react';
import CommentsList from './CommentList';
import AddComment from './AddComment';
import Error from './Error';
import Loading from './Loading';

class CommentArea extends Component {
    state = {
        comments: [], // Stato per conservare i commenti
        loading: false, // Stato per gestire il caricamento
        error: null, // Stato per gestire errori
    };

    componentDidMount() {
          // Controlla se la proprietà selected è cambiata a true e esegue il fetch dei commenti
        this.fetchComments();
    }

    fetchComments = async () => {
        const { book } = this.props;
        const url = `https://striveschool-api.herokuapp.com/api/comments/${book.asin}`;

        try {
            this.setState({ loading: true });
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            this.setState({ comments: data, loading: false });
        } catch (error) {
            console.log('Errore:', error.message);
            this.setState({ loading: false, error: 'Failed to fetch comments. Please try again later.' });
        }
    };

    refreshComments = () => {  // Funzione per ricaricare i commenti dopo un'azione 
        this.fetchComments();
    };

    handleDeleteComment = async (commentId) => {   // Funzione per gestire la cancellazione di un commento
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }

            this.setState((prevState) => ({
                comments: prevState.comments.filter((comment) => comment._id !== commentId),
            }));
        } catch (error) {
            console.log('Errore:', error.message);
        }
    };

    render() {
        const { comments, loading, error } = this.state;

        return (
            <div className="comment-area">
                {loading && <Loading />}
                {error && <Error message={error} />}
                {!loading && comments.length === 0 && <p>No comments yet.</p>}
                {!loading && comments.length > 0 && (
                    <div>
                        <h3>Comments</h3>
                        <CommentsList comments={comments} onDelete={this.handleDeleteComment} />
                    </div>
                )}
                <AddComment book={this.props.book} refreshComments={this.refreshComments} />
            </div>
        );
    }
}

export default CommentArea;
