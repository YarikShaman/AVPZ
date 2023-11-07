import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {Routes, Route} from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/contact" element={<ContactUs />}/>
            <Route path="/signup" element={<Registration />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    );
}

export default App;
