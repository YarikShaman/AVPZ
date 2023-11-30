import React, {useState} from "react";
import "../Registration/Registration.css"
import "./TestCreation.css"
import "../ResetPassword/ResetPassword.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {SaveJWT} from "../../Utilities/SaveJWT";
import QuestionInTestCreate from "../../Components/QuestionInTestCreate/QuestionInTestCreate";
interface Option{
    value:string,
    isAnswer:boolean,
    index:number,
}
function TestCreation() {
    const nav = useNavigate()
    const [isOpenedTagCreation, setIsOpenedTagCreation] = useState(false);
    const [isOpenedSecondPage, setIsOpenedSecondPage] = useState(false);
    const [errorServer, setErrorServer] = useState('');
    const [elements, setElements] =useState<number[]>([0]);

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

    function CreationConfirming() {
        setErrorServer("");
        let jwt = SaveJWT();

        nav("../companies");
    }

    return (
        <div>
            <div className={"testCreation"} style={{minHeight: 604,}}>
                <button className={"buttonBack"}>
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7L2.75 7L8 12.25L7.34 13L0.84 6.5L7.34 0L8 0.75L2.75 6L15 6V7Z" fill="black"/>
                    </svg>
                    <label className={"labelBack"}> Back to Tests</label>
                </button>
                <div className={"name"}>
                    <label>Create a Test Form</label>
                </div>
                <div className={"stepsDiv"}>
                    <div className={"stepsLabel"}>Steps:</div>
                    <div className={`stepsNum ${isOpenedSecondPage ? 'stepsNum1' : 'stepsNum2'}`}>1</div>
                    <div className={"stepsLabel"}>Test Setup</div>
                    <div className={`stepsNum ${isOpenedSecondPage ? 'stepsNum2' : 'stepsNum1'}`}>2</div>
                    <div className={"stepsLabel"}>Creating Questions</div>
                </div>
                {!isOpenedSecondPage &&
                    <div className={"firstCreationDiv"}>
                        <div className={"testNameDiv"}>
                            <input className={"nameInput nameInputs"} placeholder={"Type Test Name"}>

                            </input>
                            <input className={"descInput nameInputs"} placeholder={"Type Test Description"}>

                            </input>
                        </div>
                        <div className={"timeDiv"}>
                            <div className={"timeLimitDiv"}>
                                <label className={"timeLimitLabel"}>Time Limit</label>
                                <input className={"inputTime"} type={"time"}></input>
                            </div>
                            <div className={"dateLimitDiv"}>
                                <label>Start Date</label>
                                <input className={"inputDate"} type={"date"}></input>
                                <label>Start Time</label>
                                <input className={"inputTime"} type={"time"}></input>
                                <label>End Date</label>
                                <input className={"inputDate"} type={"date"}></input>
                                <label>End Time</label>
                                <input className={"inputTime"} type={"time"}></input>
                            </div>
                        </div>
                        <div className={"tagsDiv"}>
                            <div className='searchDiv'>
                                <input className='searchTag nameInputs'></input>
                                <span>
                                <svg width="24" height="20" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.485 17.154L10.223 10.892C9.72298 11.318 9.14798 11.6477 8.49798 11.881C7.84798 12.1144 7.19465 12.231 6.53798 12.231C4.93665 12.231 3.58132 11.6767 2.47198 10.568C1.36265 9.45871 0.807983 8.10371 0.807983 6.50304C0.807983 4.90238 1.36198 3.54671 2.46998 2.43604C3.57865 1.32471 4.93332 0.769043 6.53398 0.769043C8.13532 0.769043 9.49132 1.32371 10.602 2.43304C11.7127 3.54238 12.268 4.89804 12.268 6.50004C12.268 7.19471 12.145 7.86704 11.899 8.51704C11.6523 9.16704 11.329 9.72304 10.929 10.185L17.191 16.446L16.484 17.154H16.485ZM6.53798 11.23C7.86465 11.23 8.98498 10.7734 9.89898 9.86004C10.8123 8.94671 11.269 7.82638 11.269 6.49904C11.269 5.17238 10.8123 4.05238 9.89898 3.13904C8.98565 2.22571 7.86565 1.76904 6.53898 1.76904C5.21232 1.76904 4.09198 2.22571 3.17798 3.13904C2.26465 4.05238 1.80798 5.17238 1.80798 6.49904C1.80798 7.82571 2.26465 8.94571 3.17798 9.85904C4.09132 10.7724 5.21132 11.23 6.53798 11.23Z"
                                        fill="#717070"/>
                                </svg>
                            </span>
                            </div>
                            <div>
                                Tags
                            </div>
                            <button onClick={() => {
                                setIsOpenedTagCreation(true)
                            }} className={"createNewTag testCreationBtn"}>+ Create new tag
                            </button>
                        </div>
                        <button onClick={() => {
                            setIsOpenedSecondPage(true)
                        }} className={"nextBtn"}>
                            <label>Next </label>
                            <svg width="24" height="18" viewBox="0 0 24 23" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.916687 10.4165H20.3125L12 2.104L13.045 0.916504L23.3367 11.2082L13.045 21.4998L12 20.3123L20.3125 11.9998H0.916687V10.4165Z"
                                    fill="#FFFEFE" stroke="#FFFEFE" stroke-width="0.8"/>
                            </svg>

                        </button>
                    </div>}
                {isOpenedSecondPage &&
                    <div className={"secondCreationDiv"}>
                        {elements.map(( index) => (
                            <QuestionInTestCreate removeQuestion={() => handleRemoveElement(index)} index={index}
                                                  key={index} changeOption={function (arg0: Option[]): void {
                                throw new Error("Function not implemented.");
                            }} />
                        ))}
                        <button onClick={()=>{handleAddElement()}} className={"addQuestionBtn"}>+ Add question</button>
                        <div className={"confirmCreationDiv"}>
                            <button onClick={()=>{setIsOpenedSecondPage(false)}} className={"btnConfirmNewTag btnSaveCreation testCreationBtn btnBackToFirst"}>
                                <svg width="30" height="20" viewBox="0 0 20 22" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.0833 12.5835L3.68742 12.5835L11.9999 20.896L10.9549 22.0835L0.663252 11.7918L10.9549 1.50016L11.9999 2.68766L3.68742 11.0002L23.0833 11.0002V12.5835Z"
                                        fill="#FFFEFE" stroke="#FFFEFE" stroke-width="0.8"/>
                                </svg>
                                <label> Back</label>
                            </button>
                            <button className={"buttonConfirm btnSaveCreation"}>
                                Save
                            </button>
                        </div>
                    </div>
                }
            </div>
            {isOpenedTagCreation && <div className={"newTagDiv"}>
                <div className={"innerNewTagDiv"}>
                    <div onClick={() => {
                        setIsOpenedTagCreation(false)
                    }} className={"createTagBtnClose"}>
                        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 19L19 1L1 19ZM1 1L19 19L1 1Z" fill="#717070"/>
                            <path d="M1 19L19 1M1 1L19 19" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <label className={"createTagLabelBig"}>Create a New Tag</label>
                    <label className={"createTagLabelSmall"}>Tag Name</label>
                    <input placeholder={"Tag Name"} className={"createTagInput"}></input>
                    <label className={"createTagLabelSmall"}>Tag Description</label>
                    <input placeholder={"Tag Description"} className={"createTagInput"}></input>
                    <button className={"testCreationBtn btnConfirmNewTag"}>Confirm</button>
                </div>
            </div>}
        </div>
    )
}

export default TestCreation;