import React, {useEffect, useState} from "react";
import {IQuizUserAttempt} from "../model/IQuizUserAttempt";
import DateFormat from "../../../hooks/DateFormat";

const QuizAttempts = () => {
    const [quizAttempt, setQuizAttempt] = useState([]);
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/attempts/currUser",{
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }
        })
            .then(res => {

                return res.json();
            })
            .then(data => {
                setQuizAttempt(data);
                console.log(data);
            })
    },[])

    return(
        <div className="row mt-3">
            <div className="col-md-12">
                <div className="card-header" style={{color: "white", fontWeight:"bold", background:"#5856d6"}}>
                    <h5 className="card-title">List Of Attempted Quiz</h5>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col" >Topic Name</th>
                        <th scope="col">Number Of Question</th>
                        <th scope="col">marks Per Question</th>
                        <th scope="col">Maximum Marks</th>
                        <th scope="col">Marks Obtained</th>
                        <th scope="col">Attempted On</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizAttempt.map((quizAttempt:IQuizUserAttempt) => {
                        return(
                            <tr>
                                <td>{quizAttempt.topicName}</td>
                                <td>{quizAttempt.numberOfQuestion}</td>
                                <td>{quizAttempt.marksPerQuestion}</td>
                                <td>{quizAttempt.maxMarks}</td>
                                <td>{quizAttempt.marksObtained}</td>
                                <td>{<DateFormat date={quizAttempt.attemptedOn}/>}</td>
                            </tr>
                        );}
                    )}
                    </tbody>
                </table>
            </div>
        </div>);
}

export default QuizAttempts;