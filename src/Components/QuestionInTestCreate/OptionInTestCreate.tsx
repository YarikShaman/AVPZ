import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {SaveJWT} from "../../Utilities/SaveJWT";
import "./QuestionInTestCreate.css"

interface OptionType {
    type: string;
    index: number;
    isLast:boolean;
    onRemove: (arg0: number) => void;
    onDataChange: (data: any) => void;
}

function OptionInTestCreate(info: OptionType) {
    let nav = useNavigate();
    const [value,setValue] = useState<string>("");
    const [isAnswer,setIsAnswer] = useState<boolean>(false);
    const handleInputChange = (value: string, isAnswer: boolean) => {
        if(info.type=="open_answer"){
            setIsAnswer(true)
        }
        const newData = {
            title: value,
            is_correct: isAnswer,
            index: info.index,
        };
        info.onDataChange(newData);
    };
    return (
        <div className={"optionDiv"}>
            {(info.type == "single_choice") &&
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 1.66667C7.78986 1.66667 5.67025 2.54464 4.10744 4.10744C2.54464 5.67025 1.66667 7.78986 1.66667 10C1.66667 12.2101 2.54464 14.3298 4.10744 15.8926C5.67025 17.4554 7.78986 18.3333 10 18.3333C12.2101 18.3333 14.3298 17.4554 15.8926 15.8926C17.4554 14.3298 18.3333 12.2101 18.3333 10C18.3333 7.78986 17.4554 5.67025 15.8926 4.10744C14.3298 2.54464 12.2101 1.66667 10 1.66667ZM0 10C-1.95685e-08 8.68678 0.258658 7.38642 0.761205 6.17317C1.26375 4.95991 2.00035 3.85752 2.92893 2.92893C3.85752 2.00035 4.95991 1.26375 6.17317 0.761205C7.38642 0.258658 8.68678 0 10 0C11.3132 0 12.6136 0.258658 13.8268 0.761205C15.0401 1.26375 16.1425 2.00035 17.0711 2.92893C17.9997 3.85752 18.7362 4.95991 19.2388 6.17317C19.7413 7.38642 20 8.68678 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 3.95203e-08 12.6522 0 10Z"
                        fill="#4C0E97"/>
                </svg>}
            {(info.type == "multiple_choice") &&
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="18" height="18" rx="2" stroke="#4C0E97" strokeWidth="1.5"/>
                </svg>}
            <input onChange={(e)=>{setValue(e.target.value); handleInputChange(e.target.value,isAnswer)}} placeholder={"Answer"} className={"questionOptionInput nameInputs"}/>
            {(info.type != "open_answer") &&<>
            <input onChange={(e)=>{setIsAnswer(!isAnswer);handleInputChange(value,!isAnswer) }} className={"questionCheckbox"} type={"checkbox"}/>
            <label className={"correctLabel"}>Mark as correct</label></>}
            {info.isLast && <div className={"deleteOption"}>
            <svg  onClick={()=>{info.onRemove(info.index)}} width="25" height="25" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1L1 11ZM1 1L11 11L1 1Z" fill="#717070"/>
            <path d="M1 11L11 1M1 1L11 11" stroke="#1E1E1E" strokeLinecap="round"/>
            </svg>
            </div>}
        </div>
    );
}

export default OptionInTestCreate;
