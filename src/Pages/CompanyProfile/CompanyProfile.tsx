import React, {useEffect, useState} from "react";
import styles from './CompanyProfile.module.css'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Employee from "../../Components/Employee/Employee";
import { SaveJWT } from "../../Utilities/SaveJWT";

export default function CompanyProfile() {

    interface companyData {
        created_at: string
        staff_count:number
        description: string
        id: number
        owner_name: string
        owner_phone: string
        owner_email: string
        title: string
        users: User[]
    }

    interface User {
        id: number
        name: string
        role: string
        phone_number: string | "-------------"
        email: string | "-----------------"
    }

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


    let {id} = useParams();
    const [companyData, setCompanyData] = useState<companyData>()
    const [userData, setUserData] = useState<userData>()
    const [filter, setFilter] = useState<string>("")
    const [lastChangeTime, setLastChangeTime] = useState(0);
    const [editVisibility, setEditVisibility] = useState<boolean>(false)
    const nav = useNavigate()


    function GetCompanyData(jwt: string | null) {
        axios.get(
            `http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/${id}/?filter=${filter}`, {headers: {Authorization: "Bearer " + jwt}},
        ).then(
            resp => {
                setCompanyData(resp.data);
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

    function GetData(jwt: string | null) {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/", {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp => {
                setUserData(resp.data);
                if (resp.data.companies[0]?.role=="owner" || resp.data.companies[0]?.role=="admin") {
                    setEditVisibility(true)
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
    }


    useEffect(() => {
        // const delay = 2000;
        // const currentTime = new Date().getTime();
        //
        // const timeElapsedSinceLastChange = currentTime - lastChangeTime;
        //
        // if (timeElapsedSinceLastChange >= delay) {
        //     console.log("Performing action after 2 seconds:", filter);
        //     GetCompanyData(sessionStorage.getItem("jwt"))
        // }
        GetCompanyData(sessionStorage.getItem("jwt"))
    }, [filter, lastChangeTime]);

    useEffect(() => {
        GetData(SaveJWT());
        GetCompanyData(SaveJWT());

        console.log(companyData)
    }, [])


    return (
        <div className={styles.mainBackground}>
            <div className={styles.titleDiv}>
                <div className={styles.titleDivText}>
                    <div className={styles.titleDivTextTitle}>
                        {companyData?.title}
                    </div>
                    <div className={styles.titleDivTextRole}>
                        {userData?.companies[0]?.role || "You are nobody here..."}
                    </div>
                </div>
                <div className={styles.titleDivButton}>
                    <div onClick={()=>nav(`/companies/${id}/add_member/`)} className={styles.titleDivButtonText}>
                        +Add a New Employee
                    </div>
                </div>
            </div>
            <div className={styles.informationDiv}>
                <div className={styles.informationDivLabel}>
                    General Information
                </div>
                <table className={styles.informationDivTable}>
                    <tr>
                        <td>Amount of Employees:</td>
                        <td>{companyData?.users.length}</td>
                    </tr>
                    <tr>
                        <td>Owner Name:</td>
                        <td>{companyData?.owner_name ? companyData?.owner_name : "Vasya Pupkin"}</td>
                    </tr>
                    <tr>
                        <td>Owner Email:</td>
                        <td>{companyData?.owner_email ? companyData?.owner_email : "---------------"}</td>
                    </tr>
                    <tr>
                        <td>Owner Phone Number:</td>
                        <td>{companyData?.owner_phone ? companyData?.owner_phone : "---------------"}</td>
                    </tr>
                </table>
                <div className={styles.informationDivFilters}>
                    <input onChange={(e) => {
                        setFilter(e.target.value.toString());
                        setLastChangeTime(new Date().getTime());
                    }} type={"text"} placeholder={"Search by name, email, phone number"}
                           className={styles.informationDivFiltersSearch}
                           content="Search by name, email, phone number"/>
                </div>
                <div className={styles.informationDivThreads}>
                    <div className={styles.informationDivThreadsName}>
                        Name
                    </div>
                    <div className={styles.informationDivThreadsRole}>
                        Role
                    </div>
                    <div className={styles.informationDivThreadsEmail}>
                        Email
                    </div>
                    <div className={styles.informationDivThreadsPhone}>
                        Phone Number
                    </div>
                    <div className={styles.informationDivThreadsEmpty}>

                    </div>
                </div>
                <div className={styles.informationDivEmployees} >
                    {
                        companyData?.users.map(user => {
                            return <>
                                <Employee id={user.id} name={user.name} edit_visibility={editVisibility} email={user.email} role={user.role}
                                          phone_number={user.phone_number}/>
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}