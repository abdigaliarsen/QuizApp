import React, { useEffect, useState } from "react";
import { Container, Form, Button, Navbar, Nav, FormControl, Modal, NavDropdown, Image } from "react-bootstrap";
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
                    <Modal.Header>
                        <h2>Авторизация</h2>
                    </Modal.Header>
                    <Form onSubmit={e => loginUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="Имя"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="Пароль"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Закрыть
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Войти
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>);
        else if (modal.type === "register")
            return (
                <Modal show={modal.show} onHide={() => setModal({ show: false })}>
                    <Modal.Header>
                        <h2>Регистрация</h2>
                    </Modal.Header>
                    <Form onSubmit={e => signupUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="Имя"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="Почта"
                                className="me-2 mt-3"
                                name="email" />
                            <FormControl
                                placeholder="Пароль"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                            <FormControl
                                placeholder="Повторите пароль"
                                className="me-2 mt-3"
                                name="repeatPassword"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Закрыть
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Зарегистрироваться
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
                <NavDropdown title="Меню" id="authMenu">
                    <NavDropdown.Item href={`/profile/${username}`}>{username}</NavDropdown.Item>
                    <NavDropdown.Item href="/">Квизы</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutUser()}>Выход</NavDropdown.Item>
                </NavDropdown>
            );
        else return (
            <NavDropdown title="Меню" id="notAuthMenu">
                <NavDropdown.Item onClick={() => setModal({ type: "login", show: true })}>Войти</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setModal({ type: "register", show: true })}>Регистрация</NavDropdown.Item>
                <NavDropdown.Item href="/">Квизы</NavDropdown.Item>
            </NavDropdown>
        );
    }

    const filterQuizzes = () => {
        const form = document.getElementById('search-form');
        props.setQuery(form.value);
    }

    return (
        <Navbar fixed="top" expand="lg" style={{ backgroundColor: '#ECE1E1', fontFamily: 'Inter', fontWeight: 600 }}>
            <Container fluid>
                <Image style={{ height: '66px', width: '69px' }} src="../images/logo.png" alt="logo" />
                <Navbar.Brand href="/">Quizzes</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {renderMenu(user?.username)}
                        <Form className="d-flex">
                            <FormControl
                                id="search-form"
                                type="search"
                                placeholder="Поиск"
                                className="me-2 ml-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Image style={{ height: '21px', width: '22px', cursor: 'pointer', marginTop: '3%', marginLeft: '1%' }} onClick={() => filterQuizzes()} src="../images/search.png" alt="search" />
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {renderModal(modal)}
        </Navbar>
    )
}