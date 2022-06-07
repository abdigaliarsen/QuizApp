import React, { useEffect, useState } from "react";
import { Container, Form, Button, Navbar, Nav, FormControl, Modal, NavDropdown } from "react-bootstrap";
import { login, register, logout, getCurrentUser } from "./api";

export const Layout = (props) => {
    const [modal, setModal] = useState({ show: false, type: "" });
    const [user, setUser] = useState({});

    useEffect(() => {
        getCurrentUser().then(res => setUser(res?.data));
    }, []);

    const loginUser = e => {
        e.preventDefault();
        let loginModel = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        login(loginModel).finally(() => {
            getCurrentUser().then(res => setUser(res?.data));
        });
        setModal({ show: false });
    }

    const signupUser = e => {
        e.preventDefault();
        let registerModel = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            repeatPassowrd: e.target.repeatPassword.value
        };
        register(registerModel).then(res => {
            if (res.status !== 201)
                alert('registration process went wrong')
        });
        setModal({ show: false });
    }

    const renderModal = modal => {
        if (modal.type === "login")
            return (
                <Modal show={modal.show} onHide={() => setModal({ show: false })}>
                    <h2>Login</h2>
                    <Form onSubmit={e => loginUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="username"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="password"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>);
        else if (modal.type === "register")
            return (
                <Modal show={modal.show} onHide={() => setModal({ show: false })}>
                    <h2>Sign up</h2>
                    <Form onSubmit={e => signupUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="username"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="email"
                                className="me-2 mt-3"
                                name="email" />
                            <FormControl
                                placeholder="password"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                            <FormControl
                                placeholder="repeat password"
                                className="me-2 mt-3"
                                name="repeatPassword"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Sign up
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>);
    }

    const logoutUser = () => {
        logout().then(() => setUser({}));
        setModal({ show: false });
        window.location.reload(false);
    }

    const renderMenu = (username) => {
        if (username)
            return (
                <NavDropdown title="Menu" id="authMenu">
                    <NavDropdown.Item href={`/profile/${username}`}>{username}</NavDropdown.Item>
                    <NavDropdown.Item href="/">Quizzes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutUser()}>Exit</NavDropdown.Item>
                </NavDropdown>
            );
        else return (
            <NavDropdown title="Menu" id="notAuthMenu">
                <NavDropdown.Item onClick={() => setModal({ type: "login", show: true })}>Login</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setModal({ type: "register", show: true })}>Sign up</NavDropdown.Item>
                <NavDropdown.Item href="/">Quizzes</NavDropdown.Item>
            </NavDropdown>
        );
    }

    const filterQuizzes = () => {
        const form = document.getElementById('search-form');
        props.setQuery(form.value);
    }

    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Form className="d-flex">
                            <FormControl
                                id="search-form"
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Button onClick={() => filterQuizzes()} variant="outline-success">Search</Button>
                        </Form>
                        {renderMenu(user?.username)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {renderModal(modal)}
        </Navbar>
    )
}