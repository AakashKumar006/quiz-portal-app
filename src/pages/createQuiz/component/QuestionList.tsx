import React, {useEffect, useState } from "react";
import { IQuestionOption } from "../model/IQuestionOption";

type Props = {
    topicId:number
}
const QuestionList = (props: Props) => {

    const {topicId} = props;
    

    const [quizData, setQuizData] = useState([])
    /*let encoded = window.btoa('aakash.kumar@gmail.com:Pass@123');*/
    let encoded = window.btoa(sessionStorage.getItem("name")+":"+sessionStorage.getItem("password"));
    let auth = 'Basic '+encoded;
    useEffect(() => {
        fetch("http://localhost:8080/question/all/"+topicId,{
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
                console.log(data);
            })
    },[])

   return(
       <div className="row mt-3">
           <div className="col-md-12">
               <div className="card-header" style={{color: "white", fontWeight:"bold", background:"blue"}}>
                   <h5 className="card-title">List of Question and Answer</h5>
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
                   {quizData.map((quiz:IQuestionOption) => {
                       return(
                           <tr key={quiz.question}>
                               <td>{quiz.question}</td>
                               <td>{quiz.optionA}</td>
                               <td>{quiz.optionB}</td>
                               <td>{quiz.optionC}</td>
                               <td>{quiz.optionD}</td>
                               <td>{quiz.correctOption}</td>
                               {/*<td>
                                   <div>
                                       <Row>
                                           <Col>
                                               <Button  variant="primary">update</Button>
                                           </Col>

                                       </Row>
                                   </div>
                               </td>*/}
                           </tr>
                       );}
                   )}
                   </tbody>
               </table>
           </div>
       </div>

   );
}

export default QuestionList;
