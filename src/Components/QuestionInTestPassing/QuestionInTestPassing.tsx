import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Answer, Question} from "../Interface/Test";

interface Info {
    question: Question,
    index: number,
    count: number
}

const RadioOption = ({answer}: { answer: Answer }) => (
    <div className={"optionInPassingDiv"}>
        <input type="radio" id={`radio-${answer.question_id}-${answer.title}`} name={`radio-${answer.question_id}`}/>
        <label>{answer.title}</label>
    </div>
);

const CheckboxOption = ({answer}: { answer: Answer }) => (
    <div className={"optionInPassingDiv"}>
        <input type="checkbox" id={`checkbox-${answer.question_id}-${answer.title}`}/>
        <label>{answer.title}</label>
    </div>
);

function QuestionInTestPassing(info: Info) {
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
                        <input></input>
                    </div>}
            </div>
        </div>
    );
}

export default QuestionInTestPassing;