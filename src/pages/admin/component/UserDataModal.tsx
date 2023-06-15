import { IQuizUser } from "../model/IQuizUser";
import "../style/Modal.css";
import DateFormat from "../../../hooks/DateFormat";

type Props = {
    onClose: () => void;
    userData: IQuizUser;
}

const UserDataModal = (props: Props) => {
    const { onClose, userData } = props;
    return(
        <div>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h5>Candidate Recruitment Details</h5>
                    </div>
                    <table className="table table-user-information">
                        <tbody>
                        <tr>
                            <td className="col-sm-12">Name  :  {userData.userFirstName}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">email  :  {userData.userEmail}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">Age  :  {userData.userAge}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">DOB  :  {<DateFormat date={userData.userDateOfBirth}/>}</td>
                        </tr>
                        <tr>
                            <td className="col-sm-12">Phone No : {userData.userPhoneNo}</td>
                        </tr>
                        <tr>
                            {userData.isActive == 1 && <td className="col-sm-12">state  :  Active</td>}
                            {userData.isActive == 0 && <td className="col-sm-12">state  :  In-Active</td>}
                        </tr>
                        <tr>
                            <td className="col-sm-12">Created On  :  {userData.userCreatedOn}</td>
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

export default UserDataModal;