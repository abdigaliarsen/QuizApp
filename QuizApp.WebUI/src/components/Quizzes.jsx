import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getQuizzes } from './api';

export const Quizzes = (props) => {
    const [quizzes, setQuizzes] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        getQuizzes().then(res => setQuizzes(res.data));
    }, []);

    useEffect(() => {
        setQuery(props.query);
    }, [props.query]);

    const renderQuizzes = quizzes => {
        if (quizzes.length === 0)
            return <h3>Пусто... Вы можете создать квиз "{query ? query : ""}" чтобы пополнить общий список всех вопросников</h3>
        return (
            <ListGroup>
                {quizzes.map(quiz => {
                    return (
                        <ListGroup.Item
                            style={{ fontFamily: 'Inter', fontWeight: 400 }}
                            key={quiz.id}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto w-25">
                                <div className="fw-bold">
                                    {quiz.title}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>Автор: <Link to={`/profile/${quiz.author.username}`}>{quiz.author.username}</Link></div>
                                    <div>Прошло: {quiz.passed}</div>
                                </div>
                            </div>
                            <Link to={`quiz/${quiz.id}`}>
                                <Button style={{ backgroundColor: "#ECE1E1", border: 0, color: "black" }}>Начать</Button>
                            </Link>
                        </ListGroup.Item>)
                })}
            </ListGroup>
        );
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            {renderQuizzes(quizzes.filter(quiz => quiz.title.toLowerCase().includes(query.toLowerCase())))}
        </Container>
    );
}