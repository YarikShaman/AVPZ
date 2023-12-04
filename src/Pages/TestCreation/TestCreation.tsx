import React, {useEffect, useState} from "react";
import "../Registration/Registration.css"
import "./TestCreation.css"
import "../ResetPassword/ResetPassword.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {SaveJWT} from "../../Utilities/SaveJWT";
import QuestionInTestCreate from "../../Components/QuestionInTestCreate/QuestionInTestCreate";
import TagCreation from "../../Components/TagCreation/TagCreation";

interface Option {
    title: string,
    is_correct: boolean,
    index: number,
}

interface Question {
    title: string,
    answers: Option[],
    type: string,
    index: number,
}

interface Request {
    title: string,
    description: string,
    completion_time: number,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    company_id: string,
    tags: {id:string,title:string}[],
    questions: Question[]
}

function TestCreation() {
    const nav = useNavigate()
    const [testName, setTestName] = useState("");
    const [testDescription, setTestDescription] = useState("");
    const [testComplTime, setTestComplTime] = useState("");
    const [testStartTime, setTestStartTime] = useState("");
    const [testStartDate, setTestStartDate] = useState("");
    const [testEndTime, setTestEndTime] = useState("");
    const [testEndDate, setTestEndDate] = useState("");
    const [testCompany, setTestCompany] = useState("");
    const [companyTags, setCompanyTags] = useState<{id:string,title:string}[]>([]);
    const [testTags, setTestTags] = useState<{id:string,title:string}[]>([]);
    const [isOpenedTagCreation, setIsOpenedTagCreation] = useState(false);
    const [isOpenedSecondPage, setIsOpenedSecondPage] = useState(false);
    const [errorServer, setErrorServer] = useState('');
    const [data, setData] = useState<Question[]>([{
        title: "",
        answers: [],
        type: "single",
        index: 0
    }]);

    const handleQuestionDataChange = (updatedQuestion: Question) => {
        const index = updatedQuestion.index;
        const updatedData = [...data];
        updatedData[index] = updatedQuestion;
        setData(updatedData);
    };
    const handleRemoveElement = () => {
        setData((prevData) => {
            const updatedData = prevData.filter((option) => option.index !== prevData.length - 1);
            return updatedData;
        });
    };

    const handleAddElement = () => {
        const newIndex = data.length;
        const newQuestion: Question = {
            title: "",
            answers: [],
            type: "single",
            index: newIndex
        };
        setData((prevData) => [...prevData, newQuestion]);
    };

    const handleSaveTest = () => {
        let request: Request = {
            title: testName,
            description: testDescription,
            completion_time: Number(testComplTime),
            start_date: testStartDate,
            start_time: testStartTime,
            end_date: testEndDate,
            end_time: testEndTime,
            company_id: testCompany,
            tags: testTags,
            questions: data
        }
        console.log(request)
    }

    function CreationConfirming() {
        setErrorServer("");
        let jwt = SaveJWT();

        nav("../companies");
    }
    async function GetData(jwt: string | null) {
        try {
            const resp = await axios.get(
                "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/",
                { headers: { Authorization: "Bearer " + jwt } }
            );
            return resp.data.companies;
        } catch (err) {
            switch (err) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
            }
        }
    }
    async function GetTags(jwt: string | null) {
        try {
            const resp = await axios.get(
                "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/"+testCompany+"/tags",
                { headers: { Authorization: "Bearer " + jwt } }
            );
            return resp.data;
        } catch (err) {
            switch (err) {
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const companies = await GetData(SaveJWT());
            const companiesData = companies.map((company: { id: any; title: any; }) => ({ value: company.id, label: company.title }));
            setTestCompany(companies[0].id)
            const selectElement = document.getElementById("companySelect");
            if(selectElement)
            companiesData.forEach((company: { value: string; label: string | null; }) => {
                const optionElement = document.createElement("option");
                optionElement.value = company.value;
                optionElement.textContent = company.label;
                selectElement.appendChild(optionElement);
            });
        };

        fetchData();

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const tags = await GetTags(SaveJWT());
            setCompanyTags(tags)
            console.log(tags)
        };
        fetchData();
    }, [testCompany]);

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
                            <input value={testName} onChange={(e) => {
                                setTestName(e.target.value)
                            }} className={"nameInput nameInputs"} placeholder={"Type Test Name"}/>
                            <input value={testDescription} onChange={(e) => {
                                setTestDescription(e.target.value)
                            }} className={"descInput nameInputs"} placeholder={"Type Test Description"}/>
                        </div>
                        <div className={"timeDiv"}>
                            <div className={"timeLimitDiv"}>
                                <label className={"timeLimitLabel"}>Time Limit</label>
                                <input value={testComplTime} onChange={(e) => {
                                    setTestComplTime(e.target.value)
                                }} className={"inputTime"} type={"time"}></input>
                            </div>
                            <div className={"dateLimitDiv"}>
                                <label>Start Date</label>
                                <input value={testStartDate} onChange={(e) => {
                                    setTestStartDate(e.target.value)
                                }} className={"inputDate"} type={"date"}></input>
                                <label>Start Time</label>
                                <input value={testStartTime} onChange={(e) => {
                                    setTestStartTime(e.target.value)
                                }} className={"inputTime"} type={"time"}></input>
                                <label>End Date</label>
                                <input value={testEndDate} onChange={(e) => {
                                    setTestEndDate(e.target.value)
                                }} className={"inputDate"} type={"date"}></input>
                                <label>End Time</label>
                                <input value={testEndTime} onChange={(e) => {
                                    setTestEndTime(e.target.value)
                                }} className={"inputTime"} type={"time"}></input>
                            </div>
                        </div>
                        <div className={"tagsDiv"}>
                            <select value={testCompany} onChange={(e)=>{setTestCompany(e.target.value)}} id={"companySelect"}/>
                            <label>Tags Chosen: </label>
                            <div>
                                {testTags?.map(tag => (
                                    <tr key={tag.id}>
                                        <td>{tag.id}</td>
                                        <td>{tag.title}</td>
                                        <td style={{cursor:"pointer"}} onClick={()=>{if(testTags.indexOf({id: tag.id, title: tag.title})==-1)setTestTags(tags=>[...tags,{id: tag.id, title: tag.title}]);}}>-</td>
                                    </tr>
                                ))}
                            </div>
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
                        {data.map((question) => (
                            <QuestionInTestCreate isLast={data.length - 1 == question.index}
                                                  removeQuestion={() => handleRemoveElement()} index={question.index}
                                                  key={question.index} changeOption={handleQuestionDataChange}/>
                        ))}
                        <button onClick={() => {
                            handleAddElement()
                        }} className={"addQuestionBtn"}>+ Add question
                        </button>
                        <div className={"confirmCreationDiv"}>
                            <button onClick={() => {
                                setIsOpenedSecondPage(false)
                            }} className={"btnConfirmNewTag btnSaveCreation testCreationBtn btnBackToFirst"}>
                                <svg width="30" height="20" viewBox="0 0 20 22" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M23.0833 12.5835L3.68742 12.5835L11.9999 20.896L10.9549 22.0835L0.663252 11.7918L10.9549 1.50016L11.9999 2.68766L3.68742 11.0002L23.0833 11.0002V12.5835Z"
                                        fill="#FFFEFE" stroke="#FFFEFE" stroke-width="0.8"/>
                                </svg>
                                <label> Back</label>
                            </button>
                            <button onClick={handleSaveTest} className={"buttonConfirm btnSaveCreation"}>
                                Save
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className={"tagsChoiceDiv"}>
                <div className={"tagsCreationDiv"}>
                    <label>Chose a Tag:</label>
                    <button onClick={() => {
                        setIsOpenedTagCreation(true)
                    }} className={"createNewTag testCreationBtn"}>+ Create new tag
                    </button>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>s
                        </tr>
                        </thead>
                        <tbody>
                        {companyTags?.map(tag => (
                            <tr key={tag.id}>
                                <td>{tag.id}</td>
                                <td>{tag.title}</td>
                                <td style={{cursor:"pointer"}} onClick={()=>{if(testTags.indexOf({id: tag.id, title: tag.title})==-1)setTestTags(tags=>[...tags,{id: tag.id, title: tag.title}]);}}>+</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenedTagCreation && <TagCreation company={testCompany} setIsOpenedTagCreation={(res)=>setIsOpenedTagCreation(res)}/>}
        </div>
    )
}

export default TestCreation;