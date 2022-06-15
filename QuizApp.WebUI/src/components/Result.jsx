import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getQuizResultByUsername, getUsersByPassedQuizz } from "./api";

export const Result = () => {
    const [results, setResults] = useState([]);
    const [users, setUsers] = useState([]);

    let { quizid } = useParams();

    useEffect(() => {
        getUsersByPassedQuizz(quizid).then(res => setUsers(res.data));
    }, [quizid]);

    useEffect(() => {
        let rs = results;
        users.forEach(user => getQuizResultByUsername(user.username, quizid).then(res => rs.push(res.data)));
        setResults(rs);
    }, [quizid, users, results]);

    const renderRows = () => {
        return users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{Math.floor(Math.random() * 5)}</td>
                </tr>
            )
        });
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Почта</th>
                        <th>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </Table>
        </Container>
    )
}