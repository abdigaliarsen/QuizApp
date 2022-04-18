import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQuiz, isAuthenticated } from './api';

export const Quiz = () => {
    const [quiz, setQuiz] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    let { quizid } = useParams();

    useEffect(() => {
        getQuiz(quizid).then(res => setQuiz(res.data));
        isAuthenticated().then(res => setIsAuth(res.data));
        setIsCompleted(quizid).then(res => setIsCompleted(res.data));
    }, []);

    let quizAccess = <></>;
    if (isAuth === false)
        quizAccess = <Alert variant="danger" dismissible>
            <Alert.Heading>You aren't authorized!</Alert.Heading>
            <p>You cannot start quiz if you aren't authorized. You can Login or create a new account by clicking on menu dropdown on the top right angle!</p>
        </Alert>
    return (
        <Container style={{ marginTop: "100px" }}>
            <p>Title:       {quiz.title}</p>
            <p>Description: {quiz.description}</p>
            <p>Passed:      {quiz.passed}</p>
            {quizAccess}
        </Container>
    );
}