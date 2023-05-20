import "../style/Home.style.css";
import React, {useState} from "react";
import '../style/Home.style.css'
import UserDetailsList from "./UserDetailsList";
import '../style/Home.style.css';
import { IQuizUser } from "../model/IQuizUser";
import UserDataModal from "./UserDataModal";

const User = () => {
    const [user, setUser] = useState(null as IQuizUser | null);
    const [showModal, setShowModal] = useState(false);

    const changeModalState = (userData: IQuizUser) => {
        setShowModal(true);
        setUser(userData);
    }

    const onCloseHandler = () => {
        setShowModal(false);
    }

    return(
        <React.Fragment>
            <UserDetailsList/>
            {showModal && user !== null && <UserDataModal userData={user} onClose={onCloseHandler}/>}
        </React.Fragment>
    )
};

export default User;