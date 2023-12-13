import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {Routes, Route} from "react-router-dom";
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { JSX } from 'react/jsx-runtime';
import ResetPasswordContinue from './Pages/ResetPassword/ResetPasswordСontinue';
import MainPage from "./Pages/MainPage/MainPage";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import ContactUs from "./Pages/ContactUs/ContactUs";
import UserProfile from './Pages/UserProfile/UserProfile'
import EditProfile from './Pages/EditProfile/EditProfile';
import CompanyRegistration from './Pages/CompanyRegistration/CompanyRegistration';
import CompaniesList from './Pages/CompaniesList/CompaniesList';
import TestCreation from './Pages/TestCreation/TestCreation';
import CompanyProfile from "./Pages/CompanyProfile/CompanyProfile";
import EmployeeRegistration from './Pages/EmloyeeRegistration/EmployeeRegistration';
import EmployeeEdit from './Pages/EmployeeEdit/EmployeeEdit';
import TestPassing from './Pages/TestPassing/TestPassing';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/contact/" element={<ContactUs />}/>
            <Route path="/signup/" element={<Registration />}/>
            <Route path="/login/" element={<Login />}/>
            <Route path="/user_profile/" element={<UserProfile />}/>
            <Route path="/user_profile/edit/" element={<EditProfile />}/>
            <Route path="/forgot_password/" element={<ResetPassword/>}/>
            <Route path="/forgot_password/reset/" element={<ResetPasswordContinue/>}/>
            <Route path="/companies/:id/" element={<CompanyProfile/>}/>
            <Route path="/companies/:id/add_member/" element={<EmployeeRegistration/>}/>
            <Route path="/companies/:id/members/:id2/edit" element={<EmployeeEdit/>}/>
            <Route path="/companies/create/" element={<CompanyRegistration />}/>
            <Route path="/companies/" element={<CompaniesList />}/>
            <Route path="/tests/create/" element={<TestCreation />}/>
            <Route path="/tests/:id/" element={<TestPassing />}/>
        </Routes>
    );
}

export default App;
