import React from "react";
import {Button, Col, Row } from "react-bootstrap";

import { IQuesAns } from "../model/IQuesAns";

interface QuestionAndAnswer{
    data:Array<IQuesAns>;
}

const QuestionListToAdd = ({data}:QuestionAndAnswer) => {


    return(
        <div className="row mt-3">
            <div className="col-md-12">
                <div className="card-header" style={{color: "white", fontWeight:"bold", background:"green"}}>
                    <h5 className="card-title">List of Question And Answers To Submit</h5>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col" >Question</th>
                        <th scope="col">Option A</th>
                        <th scope="col">Option B</th>
                        <th scope="col">Option C</th>
                        <th scope="col">Option D</th>
                        <th scope="col">correct option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((quiz:IQuesAns) => {
                        return(
                            <tr key={quiz.question}>
                                <td>{quiz.question}</td>
                                <td>{quiz.optionA}</td>
                                <td>{quiz.optionB}</td>
                                <td>{quiz.optionC}</td>
                                <td>{quiz.optionD}</td>
                                <td>{quiz.correctOption}</td>
                                <td>
                                    <div>
                                        <Row>
                                            <Col>
                                                <Button  variant="primary">update</Button>
                                            </Col>

                                        </Row>
                                    </div>
                                </td>
                            </tr>
                        );}
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuestionListToAdd;