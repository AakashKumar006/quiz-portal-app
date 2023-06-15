import {IQuizUserAttempt} from "../model/IQuizUserAttempt";

type Props = {
    onClose: () => void;
    quizResult: IQuizUserAttempt;
}

const QuizResultModal = (props: Props) => {
    const { onClose, quizResult } = props;
    return(
        <div>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h5>QUIZ RESULT</h5>
                    </div>
                    <table className="table table-user-information">
                        <tbody>
                        <tr>
                            <td className="col-sm-12">Topic Name  :  {quizResult.topicName}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">Number Of Questions  :  {quizResult.numberOfQuestion}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">Maximum Marks  :  {quizResult.maxMarks}</td>
                        </tr>

                        <tr>
                            <td className="col-sm-12">Marks Obtained : {quizResult.marksObtained}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="footer">
                        <button onClick={onClose} id="cancelBtn">Close</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default QuizResultModal;