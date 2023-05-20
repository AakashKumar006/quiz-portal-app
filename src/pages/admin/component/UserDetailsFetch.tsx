import React, {useEffect, useState } from "react"
import {Button, Col, Row } from "react-bootstrap"
import { IQuizUser } from "../model/IQuizUser"


import '../style/Modal.css';


type Props = {
    viewUserDetails: (userDetails: IQuizUser) => void;
}

const UserDetailsFetch = (props: Props) => {

    const {viewUserDetails} = props;
    const [user, setUser] = useState([])
    /*let encoded = window.btoa('aakash.kumar@gmail.com:Pass@123');*/
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));

    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/user/all",{
            headers: {
                'Authorization': auth,
                'content-type' : 'application/json',
            }

        })
            .then(res => {

                return res.json();
            })
            .then(data => {
                setUser(data);
            })
    },[])
    console.log(user);


    return(

        <tbody>
        {user.map((user:IQuizUser) => {
            return(
                <tr key={user.userId}>
                    <td>{user.userFirstName}  {user.userMiddleName} {user.userLastName}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.userPhoneNo}</td>
                    {user.isActive == 1 &&<td style={{color: "green", fontWeight:"bold"}}>Active</td> }
                    {user.isActive == 0 && <td style={{color: "red"}}>In-Active</td>}
                    <td>
                        <div>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={()=> viewUserDetails(user)}>Get Details</Button>
                                </Col>
                            </Row>
                        </div>
                    </td>
                </tr>
            );}
        )}
        </tbody>


    );
}

export default UserDetailsFetch;