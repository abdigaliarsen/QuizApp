import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQuiz, isAuthenticated, isQuizCompletedByCurrentUser } from './api';

export const Quiz = () => {
    const [quiz, setQuiz] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState(0);

    let { quizid } = useParams();

    useEffect(() => {
        getQuiz(quizid).then(res => setQuiz(res.data));
        isAuthenticated().then(res => setIsAuth(res.data));
        isQuizCompletedByCurrentUser(quizid).then(res => setIsCompleted(res.data));
    }, []);

    let quizAccess = <></>;
    if (isAuth === false)
        quizAccess = <Alert variant="primary">
            <Alert.Heading>You aren't authorized!</Alert.Heading>
            <p>You cannot start quiz if you aren't authorized. You can Login or create a new account by clicking on menu dropdown on the top right angle!</p>
        </Alert>;
    else if (isCompleted === true)
        quizAccess = <Alert variant="info">
            <Alert.Heading>You have already passed this quiz..</Alert.Heading>
            <p>You cannot repass the quiz by yourself. To do so, please, contant the administrators.</p>
        </Alert>;
    else quizAccess = <Link to='questions'>Start Quiz</Link>

    return (
        <Container style={{ marginTop: "100px" }}>
            <p>Title:       {quiz.title}</p>
            <p>Description: {quiz.description}</p>
            <p>Passed:      {quiz.passed}</p>
            {quizAccess}
        </Container>
    );
}