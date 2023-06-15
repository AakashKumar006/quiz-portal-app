import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {IQuestionOption} from "../../createQuiz/model/IQuestionOption";
import {Button} from "react-bootstrap";
import {IQuestionCorrectOption} from "../model/IQuestionCorrectOption";
import {IQuizAttempt} from "../model/IQuizAttempt";
import AlertMessage from "./AlertMessage";
import QuizResultModal from "./QuizResultModal";
import {IQuizUserAttempt} from "../model/IQuizUserAttempt";

const StartQuiz = () => {
    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quizResult, setQuizResult] = useState(null as IQuizUserAttempt | null);
    const onCloseModalHandler = () => {
        setShowErrorModal(false);
    }
    const onCloseQuizResultHandler = () => {
        setShowModal(false);
        navigate("/dashboard/user/quiz/list");
    }

    const {state} = useLocation();
    const { topicId,topicName, topicDescription } = state; // Read values passed on state
    const [question, setQuestion] = useState([]);
    const [questCorrectOpt, setQuestCorrectOpt] = useState<IQuestionCorrectOption[]>([]);
    const [quizAttempt, setQuizAttempt] = useState([]);
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/questions/topic/"+topicId,{
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setQuestion(data);
                console.log(data);
            })
    },[])

    const handleSubmit = (e:any) => {
        const addSelectedOptionToList: IQuestionCorrectOption = {
            questionId: e.target.form.Qid.value,
            selectedOption: e.target.value
        }
        addQuestionToList(addSelectedOptionToList);
    }

    const postQuizAttemptData = (quizAttempt:IQuizAttempt) => {
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/api/v1/attempt',{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(quizAttempt)
        }).then(response => response.json())
            .then(response => {
                setShowErrorModal(false);
                setQuizResult(response);
                setShowModal(true);
            })
    }

    const onSubmitClickHandler = () => {
        setShowErrorModal(true);
    }


    const onSubmitClick = () => {
        setQuestCorrectOpt(questCorrectOpt);
        const quizAttemptData: IQuizAttempt = {
            topicId: topicId,
            questCorrectOpt: questCorrectOpt
        }
        postQuizAttemptData(quizAttemptData);
    }

    const addQuestionToList = (questCorrectOpt:IQuestionCorrectOption) => {
        setQuestCorrectOpt((prevQuestCorrectOpt) => {
            return [questCorrectOpt, ...prevQuestCorrectOpt];
        });
        console.log(questCorrectOpt);
    }

    let counter = 0;
    return(
        <section className="content">
            <div className="container-fluid">
                <div className="card card-primary">
                    <div className="card-header" style={{color: "black", fontWeight:"bold", background:"white"}}>
                        <center></center>
                        <h5><strong>TOPIC NAME</strong></h5>
                        <h5>{topicName} </h5>
                    </div>
                    {question.map((ques:IQuestionOption)=>{
                        counter++;
                        return(
                            <form>
                                <input type="hidden" name="Qid" value={ques.questionId} ></input>
                                <input type="hidden" name="selectedOption" value=""/>
                                <div className="card-body mt-2">
                                    <div className="nav-header">{counter} . {ques.question}</div>
                                    <div className="row">
                                        <div className="col-md-12 mt-3 " >
                                            <div className="form-check">

                                                <input className="form-check-input" type="checkbox" value="A" onChange={handleSubmit}/>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionA}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <div className="form-check">

                                                <input className="form-check-input" type="checkbox" value="B" onChange={handleSubmit}/>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionB}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <div className="form-check ">

                                                <input className="form-check-input" type="checkbox" value="C" onChange={handleSubmit}/>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionC}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <div className="form-check">

                                                <input className="form-check-input" type="checkbox" value="D" onChange={handleSubmit}/>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionD}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        );
                    })}
                </div>
                <Button onClick={onSubmitClickHandler}> Submit</Button>
            </div>
            {showErrorModal && <AlertMessage action={"Submit"} onClose={onCloseModalHandler} message={"Please review before submit"}  onSubmit={onSubmitClick}/>}
            {showModal && quizResult !== null && <QuizResultModal  onClose={onCloseQuizResultHandler} quizResult={quizResult}/>}
        </section>
    )}

export default StartQuiz;