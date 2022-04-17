import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getQuizzes } from './api';

export const Home = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        getQuizzes().then(res => setQuizzes(res.data));
    }, []);

    const renderQuizzes = quizzes => {
        let quizzesMarkUp = quizzes.map(quiz => {
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
                        Author: {quiz.author.username}
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