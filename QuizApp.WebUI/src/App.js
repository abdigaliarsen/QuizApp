import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Question } from './components/Question';

export const App = () => {
    return (
        <BrowserRouter>
            <Layout />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/quiz/:quizid" element={<Quiz />} />
                <Route exact path="/quiz/:quizid/questions/" element={<Question />} />
            </Routes>
        </BrowserRouter>
    );
}
