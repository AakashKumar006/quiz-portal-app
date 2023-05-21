import React, {useEffect, useState} from "react";
import {ITopic} from "../../createQuiz/model/ITopic";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const TakeQuiz = () => {

    const navigate = useNavigate();

    const [topicData, setTopicData] = useState([]);

    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/quiz/publish",{
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

            <div className="row mt-3">
                {
                    topicData.map((quiz:ITopic) => {
                        return(
                            <div className="col-md-4 mt-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{quiz.topicName}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{quiz.description}</h6>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                                        card's content.</p>
                                        <a href="#" className="card-link">{quiz.numberOfQuestion}</a>
                                        <a href="#" className="card-link">Another link</a>
                                        <div></div>
                                        <Button onClick={()=>sendTopicData(quiz)} variant="primary">Add Question</Button>
                                    </div>
                                </div>
                            </div>)}
                    )}
            </div>

    )

}

export default TakeQuiz;