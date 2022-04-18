import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getQuestionsByQuizId, getAnswersByQuizId, setCompletedQuizToCurrentUser } from './api';
import { useHistory } from 'react-router-dom';

export const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [curQuestionIndex, setCurQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState([]);
    const [activeAnswers, setActiveAnswers] = useState([]);
    
    const [submissionModal, setSubmissionModal] = useState(false);
    
    let { quizid } = useParams();
    let history = useHistory();

    useEffect(() => {
        getAnswersByQuizId(quizid).then(response => setAnswers(response.data));
        getQuestionsByQuizId(quizid).then(response => setQuestions(response.data));
    }, []);

    const submitAnswers = () => {
        setCompletedQuizToCurrentUser(quizid, activeAnswers.filter(answer => answer.isCorrect).length);
        setSubmissionModal(true);
        history.push(`/quiz/${quizid}`);
    }

    let prev = curQuestionIndex > 0 ?
        <Button onClick={() => setCurQuestionIndex(curQuestionIndex - 1)}>
            Previous question
        </Button>
        : <span></span>

    let next = curQuestionIndex + 1 < questions.length ?
        <Button onClick={() => setCurQuestionIndex(curQuestionIndex + 1)}>
            Next question
        </Button>
        : <Button onClick={submitAnswers} variant='danger'>Submit</Button>

    const getAnswer = e => {
        const answer = answers.find(answer =>
            answer.questionId === questions[curQuestionIndex].id &&
            answer.content === e.target.value
        );

        if (answer?.length > 1)
            throw new Error("More than one answers with the same content under the same question are found!!!");

        if (activeAnswers.includes(answer)) {
            let activeAnswersCopy = [...activeAnswers];
            activeAnswersCopy.splice(activeAnswers.findIndex(x => x.id === answer.id));
            activeAnswersCopy.push(answer);
            setActiveAnswers(activeAnswersCopy);
        } else setActiveAnswers([...activeAnswers, answer]);
    }

    const renderAnswers = () => {
        return (
            <div onChange={getAnswer}>
                {answers.filter(answer => answer.questionId === questions[curQuestionIndex].id)
                    .map(answer => {
                        let input = <></>
                        if (answer.content === activeAnswers[questions[curQuestionIndex].id])
                            input = <input checked={true} className="form-check-input" type="radio" name="answer" value={answer.content} />;
                        else input = <input className="form-check-input" type="radio" name="answer" value={answer.content} />;
                        return (
                            <div key={answer.id} className="form-check">
                                {input}
                                <label className="form-check-label" htmlFor="answerLabel">
                                    {answer.content}
                                </label>
                            </div>
                        );
                    })}
            </div>
        );
    }

    const renderQuestion = () => {
        if (questions[curQuestionIndex] === undefined)
            return <></>

        return (
            <>
                <div>{questions[curQuestionIndex].content}</div>
                <div>{renderAnswers()}</div>
            </>
        );
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <div>
                {renderQuestion()}
            </div>
            <div className="d-flex justify-content-between mt-5">
                {prev}
                {next}
            </div>
            <div className="d-flex justify-content-center">
                {curQuestionIndex + 1} / {questions.length}
            </div>
            <Modal show={submissionModal} onHide={() => setSubmissionModal(false)}>
                <Modal.Body>
                    You passed the test for {activeAnswers.filter(answer => answer.isCorrect).length} / {questions.length}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSubmissionModal(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}