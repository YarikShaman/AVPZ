import React, {useEffect, useState} from "react";
import styles from './TestResult.module.css'
import {useNavigate, useParams} from "react-router-dom";
import TestInList from "../../Components/TestInList/TestInList";
import {ListOfTest} from '../../Components/Interface/ListOfTestsData'
import axios from "axios";
import {SaveJWT} from "../../Utilities/SaveJWT";

export default function TestResult(){

    let id = useParams().id
    const nav = useNavigate()
    const [info, setInfo] = useState({"id":5, "result":7, "questions_count":10})
    const [passed, setPassed] = useState("PASSED")

    useEffect(() => {
        axios.post(
            `http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/attemps/${id}/finish`, {headers: {Authorization: "Bearer " + SaveJWT()}}
        ).then(
            resp => {
                setInfo(resp.data);
                if (resp.data.questions_count/resp.data.result<0.6){
                    setPassed("NOT PASSED")
                }
            }
        ).catch(err => {
            switch (err) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
            }
        })
    }, [])

    return(
        <div className={styles.mainBackground}>
            <div className={styles.mainDiv}>
                <div className={styles.titleDiv}>Test result "Test name"</div>
                <div className={styles.resultDiv}>
                    <div className={styles.resultDivResult}>Your result: {info.result}/{info.questions_count} points ({Math.round(info.result/info.questions_count*100)}%)</div>
                    <div className={styles.resultDivDetais}>Status: {passed}</div>
                    <div className={styles.resultDivDetais}>Test date
                        : {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</div>
                    {/*<div className={styles.resultDivDetais}>Time spent: 23:14</div>*/}
                </div>
                <div className={styles.noticeDiv}>NOTICE: test results available to review till </div>
            </div>
        </div>
    )
}