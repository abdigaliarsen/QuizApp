import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { getCreatedQuizzesByUser, getCurrentUser, getPassedQuizzesByUser } from "./api";

export const Profile = () => {
    const [user, setUser] = useState();
    const [createdQuizzes, setCreatedQuizzes] = useState([]);
    const [passedQuizzes, setPassedQuizzes] = useState([]);

    useEffect(() => {
        getCurrentUser().then(res => setUser(res?.data));
        getCreatedQuizzesByUser("user99").then(res => setCreatedQuizzes(res?.data));
        getPassedQuizzesByUser("user99").then(res => setPassedQuizzes(res?.data));
    }, []);

    const renderCreatedQuizzes = (quizzes) => {
        if (quizzes.length !== 0) {
            let quizzesMarkUp = quizzes.map(quiz => {
                return (
                    <ListGroup.Item
                        key={quiz.id}
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
            let quizzesMarkUp = quizzes.map(quiz => {
                return (
                    <ListGroup.Item
                        key={quiz.id}
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

    const renderUserView = (user) => {
        if (user)
            return (
                <div>
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                </div>
            );
        return <div>Nothing to show</div>
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <div className="mb-3">{renderUserView(user)}</div>
            <div className="mt-3">{renderPassedQuizzes(passedQuizzes)}</div>
            <div className="mt-3">{renderCreatedQuizzes(createdQuizzes)}</div>
        </Container>
    );
}