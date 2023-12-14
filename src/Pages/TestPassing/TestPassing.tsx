import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Test} from "../../Components/Interface/Test";
import "./TestPassing.css";
import {SaveJWT} from "../../Utilities/SaveJWT";
import QuestionInTestPassing from "../../Components/QuestionInTestPassing/QuestionInTestPassing";

function TestPassing() {
    let info = useParams();
    const [time, setTime] = useState(0);
    const [test, setTest] = useState<Test>()
    const [isStarted, setIsStarted] = useState<boolean>(false)
    const nav = useNavigate();
    const loadTest = () => {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/quizzes/" + info.id,
            {headers: {Authorization: "Bearer " + SaveJWT()}}
        ).then((res) => {
            setTest(res.data)
            setTime(res.data.completion_time*60)
        }).catch((err)=>nav("/"));
        console.log(test)
    }
    const handleStartTest = () =>{
        setIsStarted(true);
        startTimer(test?.completion_time)
    }
    const startTimer = (inputTime = 10) => {
        setTime(inputTime * 60);
    };
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;

        if (isStarted) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        setIsStarted(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isStarted]);
    useEffect(() => {
        loadTest()
    }, [])

    return (
        <div className={"testCreation testPassDiv"}>{!isStarted&&
            <div>
                <div className={"testTitle"}>{test?.title}</div>
                <div className={"testQuestionTitle"}>{test?.completion_time} minutes</div>
                <div className={"tagsDiv testPassTagsDiv"}>
                    <label className={"testQuestionTitle"}>Test tags: </label>
                    <div className={"testTagsList"}>
                        {test?.tags?.map(tag => (
                            <div className={"testTagsDiv testPassTags"}>
                                {tag.title}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={handleStartTest} className={"btnStartTest"}>Start</button>
            </div>}
            {isStarted&&
            <div>
                <div className={"testTitle"}>{test?.title}</div>
                <div>
                    {test?.questions.map((question,index)=>(
                            <QuestionInTestPassing question={question} index={index+1} count={test.questions.length}/>
                    ))}
                </div>
                <button style={{margin:10}} className={"btnStartTest"}>End test</button>
            </div>}
            <div className={"timerDiv"}>
                <div >
                    <svg className={"timerSvg"} width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4.84615V11L14.0769 14.0769M21 11C21 16.5231 16.5231 21 11 21C5.47692 21 1 16.5231 1 11C1 5.47692 5.47692 1 11 1C16.5231 1 21 5.47692 21 11Z" stroke="#9895D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Time left
                </div>
                <div className={"timerLabel"}>{formatTime(time)}</div>
            </div>
        </div>
    )
}

export default TestPassing;