import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Question } from './components/Question';
import { Profile } from './components/Profile';

export const App = (props) => {
    const [query, setQuery] = useState('');

    return (
        <BrowserRouter>
            <Layout setQuery={setQuery} {...props} />
            <Routes>
                <Route exact path="/" element={<Home query={query} {...props} />} />
                <Route exact path="/quiz/:quizid" element={<Quiz />} />
                <Route exact path="/quiz/:quizid/questions/" element={<Question />} />
                <Route exact path="/profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
