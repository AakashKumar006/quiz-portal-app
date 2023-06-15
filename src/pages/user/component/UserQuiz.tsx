import {Navigate, Route, Routes} from "react-router-dom";
import AddTopic from "../../createQuiz/component/AddTopic";
import AddQuestion from "../../createQuiz/component/AddQuestion";
import React from "react";
import TakeQuiz from "./TakeQuiz";
import StartQuiz from "./StartQuiz";

const UserQuiz = () => {
    return(
        <Routes>
            <Route index element={<Navigate to="/dashboard/user/quiz/list" />} />
            <Route path="/list" element={<TakeQuiz />}/>
            <Route path="/start" element={<StartQuiz/>}/>
            <Route path="/attempts" element={<StartQuiz/>}/>
        </Routes>
    )
}

export default UserQuiz;