import React, {useEffect, useState} from "react";
import { IQuestionOption } from "../model/IQuestionOption";
import {TiDeleteOutline} from "react-icons/ti";
import {RxUpdate} from "react-icons/rx";
import AlertMessage from "../../user/component/AlertMessage";
import UpdateQuestionModal from "./UpdateQuestionModal";

type Props = {
    topicId:number
}

const QuestionList = (props: Props) => {
    const {topicId} = props;
    const [quizData, setQuizData] = useState([]);
    const [quizDataToUpdate, setQuizDataToUpdate] = useState(null as IQuestionOption | null);
    const [questionIdToDelete, setQuestionIdToDelete] = useState<any>('');
    const [alertModal, setAlertModal] = useState(false);
    const [editQuestionModal, setEditQuestionModal] = useState(false);

    const onCloseModalHandler = () => {
        setAlertModal(false);
    }

    const onCloseEditQuestionModal = () => {
        setEditQuestionModal(false);
    }

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
                setQuizData(data);
            })
    },[])

    const update = (questionUpdatedData: IQuestionOption) => {

        setQuizDataToUpdate(questionUpdatedData);
        setEditQuestionModal(true);

    }

    const onEditQuestionSubmitHandler = (data:IQuestionOption) => {
        let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
        let auth = 'Basic '+encoded;
        fetch('http://localhost:8080/api/v1/questions/'+quizDataToUpdate?.questionId,{
            method: 'PUT',
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                window.location.reload();
            })
        setEditQuestionModal(false);
    }

    const deleteQuestionHandler = (questionId: string | undefined) => {
        setQuestionIdToDelete(questionId);
        setAlertModal(true)
    }

    const deleteQuestion = () => {
        fetch("http://localhost:8080/api/v1/questions/"+questionIdToDelete,{
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

    let counter = 0;
    return(
        <div className="row mt-3 mb-5">
            <div className="col-md-12">
                <div className="card-header" style={{color: "white", fontWeight:"bold", background:"darkgoldenrod",height:"50px", textAlign:"center"}}>
                    <h5 className="card-title" style={{margin:"4px"}}>List of Question and Answer</h5>
                </div>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col" >Question</th>
                        <th scope="col">Option A</th>
                        <th scope="col">Option B</th>
                        <th scope="col">Option C</th>
                        <th scope="col">Option D</th>
                        <th scope="col" style={{textAlign:"center"}}>correct option</th>
                        <th scope="col" style={{textAlign:"center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizData.length ? quizData.map((quiz:IQuestionOption) => {
                        counter++;
                        return(
                            <tr key={quiz.question}>
                                <td>{counter}.</td>
                                <td>{quiz.question}</td>
                                <td>{quiz.optionA}</td>
                                <td>{quiz.optionB}</td>
                                <td>{quiz.optionC}</td>
                                <td>{quiz.optionD}</td>
                                <td style={{textAlign:"center"}}>{quiz.correctOption}</td>
                                <td style={{textAlign:"center"}}>
                                    <a title="Update Question" className="m-1" style={{color:"blue"}} onClick={()=>update(quiz)}><RxUpdate/></a>
                                    <a title="Delete Question" className="m-1" style={{color:"red"}} onClick={()=>deleteQuestionHandler(quiz.questionId)}><TiDeleteOutline/></a>
                                </td>
                            </tr>
                        );}
                    ) : <strong>no question found</strong>}
                    </tbody>
                </table>
            </div>
            {editQuestionModal && quizDataToUpdate !== null && <UpdateQuestionModal onClose={onCloseEditQuestionModal} questionData={quizDataToUpdate} onSubmitQuestionEditData={onEditQuestionSubmitHandler}/>}
            {alertModal && <AlertMessage onClose={onCloseModalHandler} onSubmit={deleteQuestion} message={"kindly review before deleting the question."} action={"Delete"}/>}
        </div>
    );
}

export default QuestionList;
