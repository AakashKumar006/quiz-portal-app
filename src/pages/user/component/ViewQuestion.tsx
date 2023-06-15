import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IQuestionOption} from "../../createQuiz/model/IQuestionOption";

const ViewQuestion = () => {
    const {state} = useLocation();
    const { topicId, topicName } = state; // Read values passed on state
    const [question, setQuestion] = useState([]);
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
    console.log(question);
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
                                        <div className="col-md-6'">
                                            <div className="form-check">
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">A.</label>
                                               <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionA}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6'">
                                            <div className="form-check">
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">B.</label>
                                               <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionB}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6'">
                                            <div className="form-check">
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">C.</label>
                                               <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionC}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6'">
                                            <div className="form-check">
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">D.</label>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.optionD}</label>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="form-check">
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1"><strong>Correct Option</strong></label>
                                                <label className="form-check-label m-lg-2" htmlFor="defaultCheck1">{ques.correctOption}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default ViewQuestion