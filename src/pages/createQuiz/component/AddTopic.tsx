import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import useInputCreateQuiz from "../../../hooks/use-input-createQuiz";
import { IQuiz } from "../model/IQuiz";
import QuizList from "./QuizList";



const AddTopic = () => {
    
    const [display, setDisplay] = useState("none");
    const createNewQuiz = (quizData: IQuiz) => {
        /*let encoded = window.btoa('aakash.kumar@gmail.com:Pass@123');*/
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/initiateQuiz',{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(quizData)
        }).then(response => response.json())
            .then(response => {
                alert("data has been saved")
                window.location.reload();
            })
    }

    const {
        value: topicName,
        hasError: topicNameHasError,
        valueChangedHandler: topicNameChangeHandler,
        inputBlurHandler: topicNameBlurHandler,
        inputClass: topicNameInputClass,
        errorMessage: topicNameErrorMessage
    } = useInputCreateQuiz("topicName","string");

    const {
        value: description,
        hasError: descriptionHasError,
        valueChangedHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        inputClass: descriptionInputClass,
        errorMessage: descriptionErrorMessage
    } = useInputCreateQuiz("description","string");

    const {
        value: noOfQuestion,
        hasError: noOfQuestionHasError,
        valueChangedHandler: noOfQuestionChangeHandler,
        inputBlurHandler: noOfQuestionBlurHandler,
        inputClass: noOfQuestionInputClass,
        errorMessage: noOfQuestionErrorMessage
    } = useInputCreateQuiz("noOfQuestion","string");

    const {
        id: marksPerQuestion,
        hasError: marksPerQuestionHasError,
        valueChangedHandler: marksPerQuestionChangeHandler,
        inputBlurHandler: marksPerQuestionBlurHandler,
        inputClass: marksPerQuestionInputClass,
        errorMessage: marksPerQuestionErrorMessage
    } = useInputCreateQuiz("marksPerQuestion","number");

    let formIsValid = false;
    if(
        topicNameHasError === false &&
        descriptionHasError === false &&
        noOfQuestionHasError === false &&
        marksPerQuestionHasError === false
    ) {
        formIsValid = true;
    }

    const createQuizSubmitHandler = (e:any) => {
        e.preventDefault();
        if(!formIsValid) {
            return;
        }

        const createQuizRequestData : IQuiz = {
            topicName: topicName,
            userId: sessionStorage.getItem("id"),
            description: description,
            numberOfQuestion : noOfQuestion,
            marksPerQuestion: marksPerQuestion,
        }
        createNewQuiz(createQuizRequestData);
    }

    const displayHandler = () => {
        if(display === "none"){
            setDisplay("block");
        } else {
            setDisplay("none");
        }
    }

    return(
        <section className="content">
            <div className="container-fluid">
                <form onSubmit={createQuizSubmitHandler}>
                    <div className="card card-primary">
                        <div className="card-header" style={{color: "white", fontWeight:"bold", background:"#7439db"}}>
                            <h5>Create New Quiz <span className="btn-tool" onClick={displayHandler}><FaAngleDown/></span></h5>
                        </div>
                        <div className="card-body" style={{display:display}}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Topic Name</strong></label>
                                        <input value={topicName} placeholder="Enter Topic for Quiz" className={topicNameInputClass} onChange={topicNameChangeHandler} onBlur={topicNameBlurHandler}/>
                                        {topicNameHasError && <small className="text-danger">{topicNameErrorMessage}</small>}

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Description</strong></label>
                                        <textarea  value={description} placeholder="Enter Quiz Description" className={descriptionInputClass} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} />
                                        {descriptionHasError && <small className="text-danger">{descriptionErrorMessage}</small>}
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Number Of Question</strong></label>
                                        <input type="number" value={noOfQuestion} placeholder="Enter Number Of Question" className={noOfQuestionInputClass} onChange={noOfQuestionChangeHandler} onBlur={noOfQuestionBlurHandler}/>
                                        {noOfQuestionHasError && <small className="text-danger">{noOfQuestionErrorMessage}</small>}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label><span className="required"/><strong>Marks Per Each Question</strong></label>
                                        <select value={marksPerQuestion} className={marksPerQuestionInputClass} onChange={marksPerQuestionChangeHandler} onBlur={marksPerQuestionBlurHandler} >
                                            <option value={0}>Select marks for each question</option>
                                            <option value={1}>One</option>
                                            <option value={2}>Two</option>
                                            <option value={3}>Three</option>
                                            <option value={4}>Four</option>
                                            <option value={5}>Five</option>
                                        </select>
                                        {marksPerQuestionHasError && <small className="text-danger">{marksPerQuestionErrorMessage}</small>}
                                    </div>
                                </div>
                            </div>
                            <button className="button-crt" type="submit" disabled={!formIsValid}>Submit</button>
                        </div>
                    </div>
                </form>
                <QuizList />
            </div>
        </section>
    )
}

export default AddTopic;