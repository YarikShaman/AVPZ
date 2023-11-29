import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import { SaveJWT } from "../../Utilities/SaveJWT";
import "./QuestionInTestCreate.css"
import OptionInTestCreate from "./OptionInTestCreate";

function QuestionInTestCreate() {
    let nav = useNavigate();
    const [type,setType] = useState<string>("single");
    const [elements, setElements] =useState<number[]>([]);

    const handleAddElement = () => {
        setElements((elements)=>[...elements,elements.length+1]);
        console.log(elements)
    };
    const handleRemoveElement = (index:number) => {
        console.log(index)
        setElements((elements) => {
            const updatedElements = [...elements];
            updatedElements.splice(elements.indexOf(index), 1);
            return updatedElements;
        });
    };
    useEffect(()=>{

    },[])
    return (
        <div className={"questionCreationDiv"}>
            <input className={"questionName nameInputs"}></input>
            <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                <option value={"single"}>Single choice</option>
                <option value={"multiple"}>Multiple choice</option>
                <option value={"free"}>Free text</option>
            </select>
            <div className={"optionsDiv"}>
                {elements.map(( index) => (
                    <OptionInTestCreate key={index} index={index} onRemove={() => handleRemoveElement(index)} type={type} />
                ))}
            </div>
            <button onClick={()=>{handleAddElement()}} className={"addOptionBtn"}>
                + Add Option
            </button>
        </div>
    );
}

export default QuestionInTestCreate;