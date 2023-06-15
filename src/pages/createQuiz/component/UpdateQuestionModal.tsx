import React, {useState} from "react";
import {IQuestionOption} from "../model/IQuestionOption";

type Props = {
    onClose: () => void;
    questionData:IQuestionOption;
    onSubmitQuestionEditData : (questionData: IQuestionOption) => void;
}

const UpdateQuestionModal = (props: Props) => {

    const {questionData, onClose, onSubmitQuestionEditData} = props;
    const [question, setQuestion] = useState(questionData?.question);
    const [optionA, setOptionA] = useState(questionData?.optionA);
    const [optionB, setOptionB] = useState(questionData?.optionB);
    const [optionC, setOptionC] = useState(questionData?.optionC);
    const [optionD, setOptionD] = useState(questionData?.optionD);
    const [correctOption, setCorrectOption] = useState(questionData?.correctOption);

    const onChangeQuestionHandler = (event:any) => {
        setQuestion(event.target.value);
    }

    const onChangeOptionAHandler = (event:any) => {
        setOptionA(event.target.value);
    }

    const onChangeOptionBHandler = (event:any) => {
        setOptionB(event.target.value);
    }

    const onChangeOptionCHandler = (event:any) => {
        setOptionC(event.target.value);
    }

    const onChangeOptionDHandler = (event:any) => {
        setOptionD(event.target.value);
    }

    const onChangeCorrectOptionHandler = (event:any) => {
        setCorrectOption(event.target.value);
    }

    const onSubmitClickHandler = () => {
        const topicDateToUpdate: IQuestionOption = {
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            correctOption: correctOption
        }
        onSubmitQuestionEditData(topicDateToUpdate);
    }

    return(
        <div>
            <div className="modalBackground">
                <form onSubmit={onSubmitClickHandler}>
                    <div className="modalContainer">
                        <div className="title" style={{backgroundColor:"purple"}}>
                            <h5>Edit Question Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Question</strong></label>
                                        <input value={question} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeQuestionHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option A</strong></label>
                                        <input value={optionA} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeOptionAHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option B</strong></label>
                                        <input value={optionB} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeOptionBHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option C</strong></label>
                                        <input value={optionC} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeOptionCHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Option D</strong></label>
                                        <input value={optionD} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeOptionDHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"/><strong>Marks</strong></label>
                                        <select value={correctOption} className="form-control" onChange={onChangeCorrectOptionHandler}>
                                            <option value="0">Select option</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <button style={{backgroundColor:"darkred"}} onClick={onClose} id="cancelBtn">Close</button>
                                <button style={{marginLeft:"150px",backgroundColor:"blue"}} type="submit">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateQuestionModal;