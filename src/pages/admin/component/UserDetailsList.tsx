import React, { useState } from 'react';
import {IQuizUser} from '../model/IQuizUser'
import UserDataModal from './UserDataModal';
import UserDetailsFetch from './UserDetailsFetch';

const UserDetailsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null as IQuizUser | null);
    const showModalHandler = (userData: IQuizUser) => {
        setShowModal(true);
        setUserData(userData);
    }

    const onCloseModalHandler = () => {
        setShowModal(false);
    }

    return(
        <React.Fragment>
            <section>
                <div>
                    <article><h5 className="list-header">LIST OF USER</h5></article>
                    <div className="mt-3">
                        <table className="table table-striped table-sm">
                            <thead className="thread-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Status</th>
                                <th>Show Details</th>
                            </tr>
                            </thead>
                            <UserDetailsFetch viewUserDetails={showModalHandler}/>
                        </table>
                    </div>
                </div>
                {showModal && userData != null && <UserDataModal userData={userData} onClose={onCloseModalHandler}/>}
            </section>
        </React.Fragment>
    );
}

export default UserDetailsList;