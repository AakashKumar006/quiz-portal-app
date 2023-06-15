import React, {useEffect, useState} from "react";
import {ITopic} from "../../createQuiz/model/ITopic";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import DateFormat from "../../../hooks/DateFormat";

const TakeQuiz = () => {
    const navigate = useNavigate();
    const [topicData, setTopicData] = useState([]);
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
                setTopicData(data.status);
                setTopicData(data);

            })
    },[])

    const sendTopicData = (quizData: ITopic) => {
        navigate('/dashboard/user/quiz/start', { state: { topicId: quizData.topicId, topicName: quizData.topicName ,topicDescription:quizData.description } });
    }

    return(
        <div className="row small mt-3" >
            {topicData.length ? topicData.map((quiz:ITopic) => {
                return(
                    <div className="col-4 mt-4" >
                        <div className="card bg-light">
                            <div className="card-header" style={{background:"#5856d6"}}>
                               <h5  style={{fontWeight:"bold", color:"white",textAlign:"center"}} className="card-title">{quiz.topicName}</h5>
                            </div>
                            <div className="card-body" style={{backgroundColor:"white"}} >
                                <table className="table table-bordered table-striped">
                                    <tbody style={{fontWeight:"700"}}>
                                    <tr>
                                        <td className="col-sm-8">Number Of Question</td>
                                        <td>{quiz.numberOfQuestion}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-sm-8">Marks Per Question</td>
                                        <td>{quiz.marksPerQuestion}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-sm-8">Author Name</td>
                                        <td>{quiz.createdBy?.userFirstName}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-sm-8">Published On</td>
                                        <td><DateFormat date={quiz.publishedOn}/></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer bg-transparent">
                                <center><Button style={{marginTop:"0px", background:"green", border:"none"}}  onClick={()=>sendTopicData(quiz)} variant="primary">START QUIZ</Button></center>
                            </div>
                        </div>
                    </div>)}
            ) : <h5>No Quiz Available...</h5>}
        </div>
    )}

export default TakeQuiz;