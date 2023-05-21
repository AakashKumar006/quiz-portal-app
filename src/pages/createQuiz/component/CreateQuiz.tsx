import React, { useState } from 'react';
import '../style/CreateQuiz.css';

import {
    FaAngleDown,
} from "react-icons/fa";
import QuizList from './QuizList';
import { ITopic, pageEnum } from '../model/ITopic';
import useInputCreateQuiz from '../../../hooks/use-input-createQuiz';
import AddQuestion from './AddQuestion';
import NavigationBar from '../../../dashboard/NavigationBar';
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

