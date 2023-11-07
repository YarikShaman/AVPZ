import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Header from "./Components/Header"
import Footer from "./Components/Footer"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <BrowserRouter>
            <Header/>
            <App/>
            <Footer/>
        </BrowserRouter>
);
eportWebVitals();
