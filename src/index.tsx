import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import Header from "./Components/Header&Footer/Header"
import Footer from "./Components/Header&Footer/Footer"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <App/>
            <Footer/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
