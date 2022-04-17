import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQuiz } from './api';

export const Quiz = () => {
    let { quizid } = useParams();
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        getQuiz(quizid).then(res => setQuiz(res.data));
    }, []);

    return (
        <Container style={{ marginTop: "100px" }}>
            <p>Title:       {quiz.title}</p>
            <p>Description: {quiz.description}</p>
            <p>Passed:      {quiz.passed}</p>
            <Link to={`questions/`}>Start Quiz</Link>
        </Container>
    );
}