import { Button, Form, FormCheck, FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
    }, []);

    const renderCreatedQuizzes = (quizzes) => {
        if (quizzes.length !== 0) {
            let quizzesMarkUp = quizzes.map((quiz, index) => {
                return (
                    <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {quiz.title}
                            </div>
                            Author: {"user01"}
                        </div>
                        <Badge bg="light">
                            passed: {quiz.passed}
                        </Badge>
                    </ListGroup.Item>)
            });
            return (<>
                <h3>Created Quizzes:</h3>
                <ListGroup>
                    {quizzesMarkUp}
                </ListGroup>
            </>
            );
        }
    }

    const renderPassedQuizzes = (quizzes) => {
        if (quizzes.length !== 0) {
            let quizzesMarkUp = quizzes.map((quiz, index) => {
                return (
                    <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {quiz.title}
                            </div>
                            Author: {"user01"}
                        </div>
                        <Badge bg="light">
                            passed: {quiz.passed}
                        </Badge>
                    </ListGroup.Item>)
            });
            return (<>
                <h3>Passed Quizzes:</h3>
                <ListGroup>
                    {quizzesMarkUp}
                </ListGroup>
            </>
            );
        }
    }

    const addQuiz = e => {
        e.preventDefault();
        let quiz = {
            title: e.target.title.value,
            description: e.target.description.value,
            questions: questions
        };
        createQuiz(quiz);
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
        let q= { ...qs[index] };
        q.options.push(answer);
        qs[index] = q;
        setQuestions(qs);
    }

    const updateAnswerContent = (q_index, a_index, content) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options[a_index].content = content;
        qs[q_index] = q;
        setQuestions(qs);
    }

    const renderModal = modal => {
        return (
            <Modal show={modal}>
                <h2>New quiz</h2>
                <Form onSubmit={e => addQuiz(e)}>
                    <Modal.Body>
                        <FormControl
                            placeholder="title"
                            className="me-2"
                            name="title" />
                        <FormControl
                            placeholder="description"
                            className="me-2 mt-3"
                            name="description" />
                        {questions.map((question, q_index) => {
                            return <div className="ml-2">
                                <FormControl
                                    key={q_index}
                                    placeholder={`question content`}
                                    className="me-2 mt-3"
                                    name={`question${q_index}`}
                                    onChange={e => { updateQuestionContent(q_index, e.target.value) }}
                                />
                                <Button
                                    onClick={() => updateQuestionAnswers(q_index, { content: "", isCorrect: false })}
                                    variant="success"
                                    className="mt-2"
                                >
                                    Add answer
                                </Button>
                                {question.options.map((_, a_index) => {
                                    return <div className="ml-2 d-flex">
                                        <FormControl
                                            key={`${q_index}${a_index}`}
                                            placeholder={`answer content`}
                                            className="me-2 mt-3 mr-2"
                                            name={`answer${q_index}${a_index}`}
                                            onChange={e => updateAnswerContent(q_index, a_index, e.target.value)}
                                        />
                                        <Form.Check
                                            key={a_index}
                                            inline
                                            label="correct?"
                                            type="radio"
                                        />
                                    </div>
                                })}
                            </div>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { setModal(false); setQuestions([]); }}>Cancel</Button>
                        <Button
                            onClick={() => setQuestions(questions => [...questions, { options: [] }])}
                        >
                            Add question
                        </Button>
                        {questions.length > 0 ? <Button variant="success" type="submit">Create quiz</Button> : <></>}
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
                            <div>Username: {user.username}</div>
                            <div>{user.email ? `Email: ${user.email}` : ""}</div>
                        </div>
                        <div>
                            <Button onClick={() => setModal(true)}>Create quiz</Button>
                        </div>
                    </div>
                )
            if (user)
                return (
                    <div>
                        <div>Username: {user.username}</div>
                        <div>{user.email ? `Email: ${user.email}` : ""}</div>
                    </div>
                );
            return <div>Nothing to show</div>
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