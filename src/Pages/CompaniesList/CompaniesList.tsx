import {useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./CompaniesList.css"
import Company from "../../Components/CompanyInList/Company";

function CompaniesList() {
    const nav = useNavigate()

    return (
        <div className={"compDiv"}>
            <div className={"compLabel"}>
                <label >List of Companies</label>
            </div>
            <div>
                <Company/>
            </div>
            <button className={"button addMoreBtn"}>+ Add More</button>
        </div>
    )
}

export default CompaniesList;