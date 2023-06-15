import {ITopic} from "../model/ITopic";
import React, {useState} from "react";

type Props = {
    onClose: () => void;
    topicData:ITopic | undefined;
    onSubmitTopicEdit : (topicData: ITopic) => void;
}

const UpdateModal = (props: Props) => {
    const {topicData, onClose, onSubmitTopicEdit} = props;
    const [topicName, setTopicName] = useState(topicData?.topicName);
    const [topicDescription, setTopicDescription] = useState(topicData?.description);
    const [marks, setMarks] = useState(topicData?.marksPerQuestion);

    const onChangeTopicNameHandler = (event:any) => {
        setTopicName(event.target.value);
    }

    const onChangeTopicDescriptionHandler  = (event:any) => {
        setTopicDescription(event.target.value);
    }

    const onChangeMarksHandler = (event:any) => {
        setMarks(event.target.value);
    }

    const onSubmitClickHandler = () => {
        const topicDateToUpdate: ITopic = {
            topicId: topicData?.topicId,
            topicName: topicName,
            description: topicDescription,
            marksPerQuestion: marks,
            publishedOn: new Date()
        }
        onSubmitTopicEdit(topicDateToUpdate);
    }

    return(
        <div>
            <div className="modalBackground">
                <form onSubmit={onSubmitClickHandler}>
                    <div className="modalContainer">
                        <div className="title" style={{backgroundColor:"purple"}}>
                            <h5>Edit Topic Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Topic Name</strong></label>
                                        <input value={topicName} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeTopicNameHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label><span className="required"></span><strong>Topic Description</strong></label>
                                        <textarea value={topicDescription} placeholder="Enter Topic for Quiz" className="form-control" onChange={onChangeTopicDescriptionHandler}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label><span className="required"/><strong>Marks</strong></label>
                                        <select value={marks} className="form-control" onChange={onChangeMarksHandler}>
                                            <option value={0}>Select marks</option>
                                            <option value={1}>One</option>
                                            <option value={2}>Two</option>
                                            <option value={3}>Three</option>
                                            <option value={4}>Four</option>
                                            <option value={5}>Five</option>
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
    )}

export default UpdateModal;