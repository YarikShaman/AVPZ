import React, {useEffect, useState} from "react";
import styles from './ListOfTests.module.css'
import {useNavigate} from "react-router-dom";
import TestInList from "../../Components/TestInList/TestInList";
import {ListOfTest} from '../../Components/Interface/ListOfTestsData'
import axios from "axios";

interface userData {
    email: string
    name: string
    phone_number: string
    id: number
    registered_at: string
    average_score: number
    tags: Tag[]
    companies: Company[]
}

interface Tag {
    id: number
    title: string
}

interface Company {
    id: number
    title: string
    name: string
    role: string
}

export default function ListOfTests(){

    const nav = useNavigate()
    const [listData, setListData] = useState<ListOfTest>()
    // const [userData, setUserData] = useState<userData>()
    const [visibility, setVisibility] = useState('hidden')

    useEffect(() => {
        GetData(sessionStorage.getItem("jwt"));
    }, [])

    function GetData(jwt: string | null) {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/", {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp => {
                console.log(resp)
                if (resp.data.companies[0]?.role=="owner" && resp.data.companies[0]?.role=="admin" && resp.data.companies[0]?.role=="test_maker") {
                    setVisibility("visible")
                }
                GetListData(sessionStorage.getItem("jwt"), resp.data.companies[0]?.id);
            }
        ).catch(err => {
            switch (err) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
            }
        })
    }
    function GetListData(jwt: string | null, id:string) {
        axios.get(
            `http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/${id}/quizzes/for-me`, {headers: {Authorization: "Bearer " + jwt}},
        ).then(
            resp => {
                setListData(resp.data);
                console.log(resp)
            }
        ).catch(err => {
            switch (err) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
            }
        })
    }

    return(
        <div className={styles.mainBackground}>
            <div className={styles.mainDiv}>
                <div className={styles.titleDiv}>List of Tests</div>
                <div className={styles.createDiv} onClick={()=>{nav("/")}}>
                    <div className={styles.createDivText}>
                        + Create Test
                    </div>
                </div>
                <div className={styles.testsDiv}>
                    {
                        listData?.map((elem)=>{
                            return (
                                <TestInList test={elem} visibility={visibility}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}