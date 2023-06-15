import React, { useState } from 'react';
import '../style/CreateQuiz.css';
import AddQuestion from './AddQuestion';
import {Navigate, Route, Routes } from 'react-router-dom';
import AddTopic from './AddTopic';

const CreateQuiz = () => {
    return(
        <Routes>
            <Route index element={<Navigate to="/dashboard/createquiz/addtopic" />} />
            <Route path="/addtopic" element={<AddTopic />}/>
            <Route path="/addQuestion" element={<AddQuestion/>}/>
        </Routes>
    );
}

export default CreateQuiz;

