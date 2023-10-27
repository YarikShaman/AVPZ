import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {Routes, Route} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/signup" element={<Registration />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    );
}

export default App;
