import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

import { Home } from './views/home/Home';
import { Archive } from "./views/archive/Archive";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/daily" element={<Home />}/>
                <Route path="/daily/archive" element={<Archive />}/>
            </Routes>
        </Router>
    );
}

export default App;
