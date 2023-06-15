import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { IQuestionOption } from "../model/IQuestionOption";
import QuestionList from "./QuestionList";
import QuestionListToAdd from "./QuestionListToAdd";

const AddQuestion = () => {
    const {state} = useLocation();
    const { topicId,topicName} = state; // Read values passed on state
    const [enterQuestion, setEnterQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correct, setCorrect] = useState("0");

    const questionChangeHandler = (event:any) => {
        setEnterQuestion(event.target.value);
    };
    const optionAChangeHandler = (event:any) => {
        setOptionA(event.target.value);
    };
    const optionBChangeHandler = (event:any) => {
        setOptionB(event.target.value);
    };
    const optionCChangeHandler = (event:any) => {
        setOptionC(event.target.value);
    };
    const optionDChangeHandler = (event:any) => {
        setOptionD(event.target.value);
    };
    const correctChangeHandler = (event:any) => {
        setCorrect(event.target.value);
    };

    const addQuestionHandler = (event:any) => {
        event.preventDefault();
        const quesAnsData = {
            question: enterQuestion,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD:optionD,
            correctOption:correct
        };
        addQuestionToList(quesAnsData);
        setEnterQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setCorrect("");
    }

    const [question, setQuestion] = useState<IQuestionOption[]>([]);
    const addQuestionToList = (question:IQuestionOption) => {
        setQuestion((prevExpenses) => {
            return [question, ...prevExpenses];
        });
    }

    const onSubmitClickHandler = () => {
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/api/v1/questions/topic/'+ topicId,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(question)
        }).then(response => response.json())
            .then(response => {
                alert("Question Added")

            })
        setQuestion([]);
        window.location.reload();
    }

    return(
        <section className="content">
            <div className="container-fluid">
                <form onSubmit={addQuestionHandler}>
                    <div className="card card-primary">
                        <div className="card-header" style={{color: "black", fontWeight:"bold", background:"white"}}>
                            <h5><strong>TOPIC NAME</strong> </h5>
                            <h5>{topicName} </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Enter Question</strong></label>
                                        <textarea value={enterQuestion}  placeholder="Enter Quiz Description" className="form-control" onChange={questionChangeHandler} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option A</strong></label>
                                        <input value={optionA} placeholder="Enter Topic for Quiz" className="form-control" onChange={optionAChangeHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option B</strong></label>
                                        <input value={optionB} placeholder="Enter Topic for Quiz" className="form-control" onChange={optionBChangeHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option C</strong></label>
                                        <input value={optionC} placeholder="Enter Topic for Quiz" className="form-control" onChange={optionCChangeHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option D</strong></label>
                                        <input value={optionD} placeholder="Enter Topic for Quiz" className="form-control" onChange={optionDChangeHandler}/>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label><span className="required"/><strong>Choose Correct Option</strong></label>
                                        <select value={correct} className="form-control" onChange={correctChangeHandler}>
                                            <option value="0">Select option</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button className="button-crt" type="submit">ADD</button>
                        </div>
                    </div>
                </form>
                <Button type="submit" onClick={onSubmitClickHandler}  style={{fontWeight:"bold"}} >Submit All</Button>
                <QuestionListToAdd data={question}/>
                <QuestionList topicId={topicId}/>
            </div>
        </section>
    )
}

export default AddQuestion;