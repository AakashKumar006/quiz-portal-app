import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainDashboard from './dashboard/MainDashboard';
import Login from './Login';
import { Register } from './Register';


function App() {
    return (
        <Routes>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard/*" element={<MainDashboard/>}/>
        </Routes>
    );
}




export default App;
