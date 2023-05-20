import React, { useEffect, useState } from "react";
import {BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import './Dashboard.css';
import '../pages/user/component/TakeQuiz';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDetailsList from "../pages/admin/component/UserDetailsList";

import User from "../pages/admin/component/User";
import CreateQuiz from "../pages/createQuiz/component/CreateQuiz";
import AddQuestion from "../pages/createQuiz/component/AddQuestion";
import AllQuiz from "../pages/createQuiz/component/AllQuiz";
import TakeQuiz from "../pages/user/component/TakeQuiz";
import UserQuiz from "../pages/user/component/UserQuiz";



function MainDashboard() {

    const navigate = useNavigate();
    if(sessionStorage.getItem("authenticate") !== "true") {
        return <Navigate replace to="/login" />;
    } else {
        let roleBasedLink;
        if(sessionStorage.getItem("role") == "ROLE_ADMIN"){
            roleBasedLink = <Route path="/createquiz/*" element={<CreateQuiz/>}/>
        }
        if(sessionStorage.getItem("role") == "ROLE_USER"){
            roleBasedLink = <Route path="/user/quiz/*" element={<UserQuiz/>}/>
        }
        
        return (
            <React.Fragment>
                <NavigationBar userName={sessionStorage.getItem("name")} />
                <Sidebar>
                    <section className="section-content">
                    <Routes>
                        {roleBasedLink}
                        <Route path="/allquiz" element={<AllQuiz/>}/>
                        <Route path="/user" element={<User/>}/>
                    </Routes>
                    </section>
                </Sidebar>
                <ToastContainer/>
            </React.Fragment>
        );
    }
}

export default MainDashboard;