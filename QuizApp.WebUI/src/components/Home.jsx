import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getQuizzes } from './api';

export const Home = (props) => {
    const [quizzes, setQuizzes] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        getQuizzes().then(res => setQuizzes(res.data));
    }, []);

    useEffect(() => {
        setQuery(props.query);
    }, [props.query]);

    const renderQuizzes = quizzes => {
        let quizzesMarkUp = quizzes.filter(quiz => quiz.title.toLowerCase().includes(query.toLowerCase())).map(quiz => {
            return (
                <ListGroup.Item
                    key={quiz.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">
                            <Link to={`quiz/${quiz.id}`}>{quiz.title}</Link>
                        </div>
                        Author: <Link to={`/profile/${quiz.author.username}`}>{quiz.author.username}</Link>
                    </div>
                    <Badge bg="light">
                        passed: {quiz.passed}
                    </Badge>
                </ListGroup.Item>)
        });
        return (
            <ListGroup>
                {quizzesMarkUp}
            </ListGroup>
        );
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            {renderQuizzes(quizzes)}
        </Container>
    );
}