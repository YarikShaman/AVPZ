import React, {useEffect, useState} from "react";
import "./QuestionInTestPassing.css"
import axios from "axios";
import {SaveJWT} from "../../Utilities/SaveJWT";
interface Answer {
    id: number;
    title: string;
    question_id: number;
}

interface Question {
    title: string;
    type: string;
    id: string;
    quiz_id: string;
    answers: Answer[];
}
interface Info {
    question: Question,
    index: number,
    count: number,
    attempt_id:string,
}



function QuestionInTestPassing(info: Info) {
    const [answers,setAnswers]=useState<string[]>([])
    const [answer,setAnswer]=useState<string>("")
    const RadioOption = ({answer}: { answer: Answer }) => {

        const handleRadio =(e:string)=>{
            const ans = [e]
            setAnswers(ans)
            console.log(answers)
        }
        return(
            <div className={"optionInPassingDiv"}>
                <input style={{background:"green"}}  onChange={(e)=>handleRadio(e.target.value)} value={`${answer.id}`} type="radio" id={`radio-${answer.question_id}-${answer.id}`} name={`radio-${answer.question_id}`}/>
                <label>{answer.title}</label>
            </div>
        );
    }

    const CheckboxOption = ({answer}: { answer: Answer }) => {
        const handleCheckbox = (e:string) => {
            setAnswer(e)
        };
        return(
            <div className={"optionInPassingDiv"}>
                <input onChange={(e)=>handleCheckbox(e.target.value)} type="checkbox" value={`${answer.id}`} id={`checkbox-${answer.question_id}-${answer.id}`}/>
                <label>{answer.title}</label>
            </div>
        );
    }
    const answerRequest=()=>{
        let req;
        if(info.question.type=="single_choice"||info.question.type=="open_answer"){
            req = {answers:[answer]}
        }
        else{
            req = answers;
        }
        axios.post(`http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/attempts/${info.attempt_id}/answer-question/${info.question.quiz_id}/`,
            req,
            {headers: {Authorization: "Bearer " + SaveJWT()}})
    }
    return (
        <div>
            <div className={"testNumberDiv"}>
                {info.index} of {info.count} Questions
            </div>
            <div className={"questionCreationDiv"}>
                <div className={"testQuestionTitle"}>{info.question.title}</div>
                {info.question.type == "single_choice" &&
                    <div>
                        {info.question.answers.map((answer) => (
                            <RadioOption key={answer.title} answer={answer}/>
                        ))}
                    </div>}
                {info.question.type == "multiple_choice" &&
                    <div>
                        {info.question.answers.map((answer) => (
                            <CheckboxOption key={answer.title} answer={answer}/>
                        ))}
                    </div>}
                {info.question.type == "open_answer" &&
                    <div>
                        <input value={answer} onChange={(e)=>setAnswer(e.target.value)}></input>
                    </div>}
                <button className={"btnSaveAnswer"} onClick={answerRequest}>Answer</button>
            </div>
        </div>
    );
}

export default QuestionInTestPassing;