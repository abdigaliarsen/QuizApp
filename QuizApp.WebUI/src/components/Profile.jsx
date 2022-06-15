import { Button, Form, FormCheck, FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { createQuiz, getCreatedQuizzesByUser, getCurrentUser, getPassedQuizzesByUser, getUserByUsername } from "./api";

export const Profile = () => {
    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState();
    const [createdQuizzes, setCreatedQuizzes] = useState([]);
    const [passedQuizzes, setPassedQuizzes] = useState([]);
    const [modal, setModal] = useState(false);
    const [questions, setQuestions] = useState([]);

    const { username } = useParams();

    useEffect(() => {
        getCurrentUser().then(res => setCurrentUser(res.data));
        getUserByUsername(username).then(res => setUser(res.data));
        getCreatedQuizzesByUser(username).then(res => setCreatedQuizzes(res?.data));
        getPassedQuizzesByUser(username).then(res => setPassedQuizzes(res?.data));
    }, [username]);

    const renderCreatedQuizzes = (quizzes) => {
        if (quizzes.length === 0)
            return (<>
                <h3>Созданные квизы:</h3>
                <p>Пусто...</p>
            </>)
        let quizzesMarkUp = quizzes.map((quiz, index) => {
            return (
                <ListGroup.Item
                    key={index}
                    as="li"
                    style={{ fontFamily: 'Inter', fontWeight: 400 }}
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
                    <div>
                        <Link to={`/quiz/${quiz.id}/passedusers/`}>Посмотреть результаты квиза</Link>
                    </div>
                </ListGroup.Item>)
        });
        return (<>
            <h3>Созданные квизы:</h3>
            <ListGroup>
                {quizzesMarkUp}
            </ListGroup>
        </>
        );
    }

    const renderPassedQuizzes = (quizzes) => {
        if (quizzes.length === 0)
            return (<>
                <h3>Прошедшие квизы:</h3>
                <p>Пусто...</p>
            </>)

        let quizzesMarkUp = quizzes.map((quiz, index) => {
            return (
                <ListGroup.Item
                    key={index}
                    as="li"
                    style={{ fontFamily: 'Inter', fontWeight: 400 }}
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
                </ListGroup.Item>)
        });
        return (<>
            <h3>Прошедшие квизы:</h3>
            <ListGroup>
                {quizzesMarkUp}
            </ListGroup>
        </>
        );
    }

    const addQuiz = e => {
        e.preventDefault();
        let quiz = {
            title: e.target.title.value,
            description: e.target.description.value,
            questions: questions
        };
        createQuiz(quiz);
        window.location.reload();
    }

    const updateQuestionContent = (index, content) => {
        let qs = [...questions];
        let q = { ...qs[index] };
        q.content = content;
        qs[index] = q;
        setQuestions(qs);
    }

    const updateQuestionAnswers = (index, answer) => {
        let qs = [...questions];
        let q = { ...qs[index] };
        q.options.push(answer);
        qs[index] = q;
        setQuestions(qs);
    }

    const removeQuestionAnswer = (q_index) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options.splice(q.options.length - 1, 1);
        qs[q_index] = q;
        setQuestions(qs);
    }

    const updateAnswerContent = (q_index, a_index, content) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options[a_index].content = content;
        qs[q_index] = q;
        setQuestions(qs);
    }

    const updateAnswerIsCorrect = (q_index, a_index) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options[a_index].isCorrect = !q.options[a_index].isCorrect;
        qs[q_index] = q;
        setQuestions(qs);
    }

    const removeQuestion = () => {
        let qs = [...questions];
        qs.pop();
        setQuestions(qs);
    }

    const renderModal = modal => {
        return (
            <Modal size="lg" show={modal}>
                <Modal.Header>
                    <h2>Создать квиз</h2>
                </Modal.Header>
                <Form onSubmit={e => addQuiz(e)}>
                    <Modal.Body>
                        <FormControl
                            placeholder="Название"
                            className="me-2"
                            name="title" />
                        <FormControl
                            placeholder="Описание"
                            className="me-2 mt-3"
                            name="description" />
                        {questions.map((question, q_index) => {
                            return <div className="ml-2">
                                <FormControl
                                    key={q_index}
                                    placeholder="Вопрос"
                                    className="me-2 mt-3"
                                    name={`question${q_index}`}
                                    onChange={e => { updateQuestionContent(q_index, e.target.value) }}
                                />
                                <Button
                                    onClick={() => updateQuestionAnswers(q_index, { content: "", isCorrect: false })}
                                    variant="success"
                                    className="mt-2"
                                >
                                    Добавить ответ
                                </Button>
                                <Button
                                    onClick={() => removeQuestionAnswer(q_index)}
                                    className="ml-2 mt-2"
                                    variant="outline-danger"
                                >
                                    Удалить ответ
                                </Button>
                                {question.options.map((_, a_index) => {
                                    return <div className="ml-2 mt-2 d-flex">
                                        <FormControl
                                            key={`${q_index}${a_index}`}
                                            placeholder="Ответ"
                                            className="me-2 mt-3 mr-2"
                                            name={`answer${q_index}${a_index}`}
                                            onChange={e => updateAnswerContent(q_index, a_index, e.target.value)}
                                        />
                                        <FormCheck
                                            key={a_index}
                                            inline
                                            label="правильно?"
                                            type="checkbox"
                                            onChange={() => updateAnswerIsCorrect(q_index, a_index)}
                                        />
                                    </div>
                                })}
                            </div>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { setModal(false); setQuestions([]); }}>Отмена</Button>
                        <Button
                            onClick={() => removeQuestion()}
                            className="ml-2"
                            variant="outline-danger"
                            hidden={questions.length === 0}
                        >
                            Удалить вопрос
                        </Button>
                        <Button
                            onClick={() => setQuestions(questions => [...questions, { options: [] }])}
                        >
                            Добавить вопрос
                        </Button>
                        <Button hidden={questions.length === 0} variant="success" type="submit">Создать квиз</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

    const renderUserView = (user, currentUser) => {
        if (user && currentUser) {
            if (user.username === currentUser.username)
                return (
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>Имя: {user.username}</div>
                            <div>{user.email ? `Почта: ${user.email}` : ""}</div>
                        </div>
                        <div>
                            <Button onClick={() => setModal(true)}>Создать квиз</Button>
                        </div>
                    </div>
                )
            if (user)
                return (
                    <div>
                        <div>Имя: {user.username}</div>
                        <div>{user.email ? `Почта: ${user.email}` : ""}</div>
                    </div>
                );
            return <div>Пусто...</div>
        }
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <div className="mb-3">{renderUserView(user, currentUser)}</div>
            <div className="mt-3">{renderPassedQuizzes(passedQuizzes)}</div>
            <div className="mt-3">{renderCreatedQuizzes(createdQuizzes)}</div>
            {renderModal(modal)}
        </Container>
    );
}