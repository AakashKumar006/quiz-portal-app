import React, {useEffect, useState} from "react";
import {ITopic} from "../model/ITopic";
import {GrView} from "react-icons/gr";
import DateFormat from "../../../hooks/DateFormat";
import {useNavigate} from "react-router-dom";
import "./AllQuiz.css"

const AllQuiz = () => {
    const navigate = useNavigate();
    const [quizInfo, setQuizInfo] = useState([]);
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/topics?publish=1",{
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setQuizInfo(data);
            })
    },[])

    const sentTopic = (topic: ITopic | undefined) => {
        navigate('/dashboard/allquiz/question', {state:{topicId:topic?.topicId, topicName:topic?.topicName}});
    }

    let counter=0;
    return(
        <div className="row mt-3" >
            <div className="col-md-12">
                <div className="card-header">
                    <h5 className="card-title">List of All Published Quizzes</h5>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th scope="col" >Topic Name</th>
                       {/* <th scope="col" >Description</th>*/}
                        <th scope="col" >Author Name</th>
                       <th scope="col">Number Of Question</th>
                        <th scope="col">Marks per Question</th>
                        <th scope="col">Maximum Marks</th>
                        {/*<th scope="col">Number Of Attempts</th>*/}
                        <th scope="col" >Published On</th>
                        <th scope="col">View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizInfo.length ? quizInfo.map((quiz:ITopic) => {
                        counter++;
                        return(
                            <tr key={quiz.topicId}>
                                <td>{counter}.</td>
                                <td>{quiz.topicName}</td>
                                <td>{quiz.createdBy?.userFirstName}</td>
                                <td>{quiz.numberOfQuestion}</td>
                                <td>{quiz.marksPerQuestion}</td>
                                <td>{quiz.maxMarks}</td>
                                <td><DateFormat date={quiz.publishedOn}/></td>
                                <td>
                                <GrView className="view-question-btn" onClick={()=>sentTopic(quiz)}/>
                                </td>
                            </tr>
                        );}
                    ) : <strong>no record found</strong>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllQuiz