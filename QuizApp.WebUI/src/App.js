import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Quizzes } from './components/Quizzes';
import { Quiz } from './components/Quiz';
import { Question } from './components/Question';
import { Profile } from './components/Profile';
import { Result } from './components/Result';

export const App = (props) => {
    const [query, setQuery] = useState('');

    return (
        <BrowserRouter>
            <Layout setQuery={setQuery} {...props} />
            <Routes>
                <Route exact path="/" element={<Quizzes query={query} {...props} />} />
                <Route exact path="/quiz/:quizid" element={<Quiz />} />
                <Route exact path="/quiz/:quizid/passedusers/" element={<Result />}/>
                <Route exact path="/quiz/:quizid/questions/" element={<Question />} />
                <Route exact path="/profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
