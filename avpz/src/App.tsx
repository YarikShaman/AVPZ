import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Calendar from 'react-calendar'
import {Routes, Route} from "react-router-dom";
import MainPage from "./Pages/MainPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
        </Routes>
    );
}

export default App;
