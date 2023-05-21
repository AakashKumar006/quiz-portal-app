import React, {useEffect, useState } from "react";
import {Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ITopic } from "../model/ITopic";

const QuizList = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([])
    const [status, setStatus] = useState('');
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/topic",{
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStatus(data.status);
                setQuizData(data);

            })
    },[])

    let quizDataTODisplay;

    if(quizData.length !== undefined){
        quizDataTODisplay = quizData.map((quiz:ITopic) => {
            return(
                <tr key={quiz.topicId}>
                    <td>{quiz.topicName}</td>
                    <td>{quiz.numberOfQuestion}</td>
                    <td>{quiz.marksPerQuestion}</td>
                    <td>{quiz.maxMarks}</td>
                    <td>{quiz.publish}</td>
                    <td>
                        <div>
                            <Row>
                                <Col>
                                    <Button onClick={()=>sendTopicData(quiz)} variant="primary">Add Question</Button>
                                </Col>
                            </Row>
                        </div>
                    </td>
                </tr>
            );
        })
    } else {
        quizDataTODisplay = <h5>no record found....</h5>
    }

    const sendTopicData = (quizData: ITopic) => {
        navigate('/dashboard/createquiz/addQuestion', { state: { topicId: quizData.topicId, topicName: quizData.topicName ,topicDescription:quizData.description } });
    }

    return(
        <React.Fragment>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card-header" style={{color: "white", fontWeight:"bold", background:"green"}}>
                        <h5 className="card-title">List of Quizies</h5>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" >Topic Name</th>
                            <th scope="col">Number Of Question</th>
                            <th scope="col">Marks per Question</th>
                            <th scope="col">Maximum Marks</th>
                            <th scope="col">Publish Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {quizDataTODisplay}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
        );}

export default QuizList;