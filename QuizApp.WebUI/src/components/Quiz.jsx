import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQuiz, getCurrentQuizScore, isAuthenticated, isQuizCompletedByCurrentUser } from './api';

export const Quiz = () => {
    const [quiz, setQuiz] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState({ maxScore: 0, correctAnswers: 0 });

    let { quizid } = useParams();

    useEffect(() => {
        getQuiz(quizid).then(res => setQuiz(res.data));
        isAuthenticated().then(res => setIsAuth(res.data));
        isQuizCompletedByCurrentUser(quizid).then(res => setIsCompleted(res.data));
    }, [quizid]);

    useEffect(() => {
        if (isCompleted === true)
            getCurrentQuizScore(quizid).then(res => setQuizResult(res.data));
    }, [quizid, isCompleted])

    let quizAccess = <></>;
    if (isAuth === false)
        quizAccess = <Alert variant="primary">
            <Alert.Heading>Вы не вошли в систему!</Alert.Heading>
            <p>Вам необходимо авторизоваться чтобы сдать текущий тест. Пожалуйста, нажмите на кнопку "Войти" в выпадающем списке Меню сверху справа страницы.</p>
        </Alert>;
    else if (isCompleted === true)
        quizAccess = <Alert variant="info">
            <Alert.Heading>Вы уже сдали данный тест. Ваш результат: {`${quizResult.correctAnswers}`}/{`${quizResult.maxScore}`}</Alert.Heading>
            <p>Вы не можете сдать текущий тест повторно. Чтобы обновить доступ, пожалуйста, обратитесь к администратору.</p>
        </Alert>;
    else quizAccess = <Link to='questions'>Начать квиз</Link>

    return (
        <Container style={{ marginTop: "100px" }}>
            <p>Название:       {quiz.title}</p>
            <p>Описание: {quiz.description}</p>
            <p>Прошло:      {quiz.passed}</p>
            {quizAccess}
        </Container>
    );
}