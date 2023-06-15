import React, {useEffect, useState } from "react";
import {Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ITopic } from "../model/ITopic";
import {AiOutlineFileAdd} from "react-icons/ai";
import "./QuizList.css";
import {SlNote} from "react-icons/sl";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateModal from "./UpdateModal";
import AlertMessage from "../../user/component/AlertMessage";

const QuizList = () => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([])
    const [status, setStatus] = useState(null as ITopic | null);
    const [topicId, setTopicId] = useState<number>();
    const [topicData, setTopicData] = useState(null as ITopic | null);
    const [updateModal, setUpdateModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/topics/currUser",{
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

    const onCloseModalHandler = () => {
        setAlertModal(false);
    }

    const onPublishClickHandler = (noOfQuestion: number|undefined, topicId:number|undefined) => {
        if(noOfQuestion === 0){
            return;
        }
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/api/v1/topic/'+topicId+'/publish',{
            mode: 'cors',
            method: 'PATCH',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(quizData)
        }).then(response => response.json())
            .then(response => {
                alert("QUIZ PUBLISHED")

            })
        window.location.reload();
    }

    const update = (topic:ITopic) => {
        setUpdateModal(true);
        setTopicData(topic);
    }


    const deleteQuestionHandler = (topicId:number | undefined) => {
        setTopicId(topicId)
        setAlertModal(true);
    }

    const deleteTopic = () => {
        fetch("http://localhost:8080/api/v1/topic/"+topicId,{
            method:"DELETE",
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                window.location.reload();
            })


    }

    const onCloseEditModal = () => {
        setUpdateModal(false);
    }

    const onTopicEditSubmitHandler = (topicData: ITopic) => {
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/api/v1/topic/'+topicData.topicId,{
            method: 'PUT',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(topicData)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }


    let quizDataTODisplay;
    if(quizData.length !== undefined){
        quizDataTODisplay = quizData.map((quiz:ITopic) => {
            return(
                <tr key={quiz.topicId}>
                    <td>{quiz.topicName}</td>
                    <td>{quiz.numberOfQuestion}</td>
                    <td>{quiz.marksPerQuestion}</td>
                    <td>{quiz.maxMarks}</td>
                    {quiz.publish === 0 ? <button onClick={()=>onPublishClickHandler(quiz.numberOfQuestion, quiz.topicId)}><td>click to publish</td></button> : <td>Published</td>}
                    <td style={{textAlign:"center"}}>
                        <a title="Update Topic" className="update-topic-btn" onClick={()=>update(quiz)}><SlNote/></a>
                        <a title="Delete Topic" className="delete-topic-btn" onClick={()=>deleteQuestionHandler(quiz.topicId)}><RiDeleteBin6Line/></a>
                    </td>
                    <td style={{textAlign:"center"}}>
                        <div>
                            <Row>
                                <Col>
                                    <AiOutlineFileAdd title="click to add Question" className="add-question" onClick={()=>sendTopicData(quiz)}/>
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
                        <h5 className="card-title">My Quiz List</h5>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" >Topic Name</th>
                            <th scope="col">Number Of Question</th>
                            <th scope="col">Marks per Question</th>
                            <th scope="col">Maximum Marks</th>
                            <th scope="col">Publish Status</th>
                            <th scope="col" style={{textAlign:"center"}}>Action</th>
                            <th scope="col" style={{textAlign:"center"}}>Add Question</th>
                        </tr>
                        </thead>
                        <tbody>
                        {quizDataTODisplay}
                        </tbody>
                    </table>
                </div>
            </div>
            {updateModal && topicData !== null && (<UpdateModal topicData={topicData} onClose={onCloseEditModal} onSubmitTopicEdit={onTopicEditSubmitHandler}/>)}
            {alertModal && <AlertMessage action={"Delete"} onClose={onCloseModalHandler} message={"Deleting the topic will also delete associated question, kindly review before clicking on submit."}  onSubmit={deleteTopic}/>}
        </React.Fragment>
    );}

export default QuizList;