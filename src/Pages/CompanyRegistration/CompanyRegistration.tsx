import React, {useState} from "react";
import "../Registration/Registration.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"

function CompanyRegistration() {
    const [companyName, setCompanyName] = useState("");
    const [errorCompanyName, setErrorCompanyName] = useState("");
    const [errorServer, setErrorServer] = useState('');
    const nav = useNavigate()

    function SaveJWT() {
        if (!!localStorage.getItem("jwt")) {
            return localStorage.getItem("jwt");
        } else if (!!sessionStorage.getItem("jwt")) {
            return sessionStorage.getItem("jwt");
        } else {
            return "error"
        }
    }
    function RegistrationConfirming(
        companyName: string) {
        setErrorServer("");
        if(errorCompanyName!="") return;
        let jwt = SaveJWT();
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/create/", {
            title: companyName
        }, {
            headers: {Authorization: "Bearer " + jwt}
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setErrorCompanyName("Incorrect Company Name");
                    break;
                case 401:
                    setErrorServer("Server is down, try later");
                    break;
                case 422:
                    setErrorServer("One of fields were passed incorrectly");
                    break;
                case 500:
                    setErrorServer("Server is down, try later");
                    break;
            }
        });
        nav("../companies");
}

return (
    <div>
        <div style={{minHeight:454, marginTop:150}}>
            <div className={"name"}>
                <label>Company Registration</label>
            </div>
            <form className="form" action="#" method="POST" onSubmit={(e) => {
                e.preventDefault();
                RegistrationConfirming(companyName)
            }}>{errorServer && (
                <div className="serverError">Error: {errorServer}</div>)}
                <div className={"block"}>
                    <div className={"label"}>
                        <label htmlFor="companyName">
                            Company name
                        </label>
                        <label style={{color: "red"}}>*</label>
                    </div>
                    <input
                        className={"input"}
                        onChange={(e) => {
                            setCompanyName(e.target.value)
                            if (!RegExp("^[a-zA-Z]{2,20}$").test(e.target.value))
                                setErrorCompanyName("Incorrect Company Name")
                            else
                                setErrorCompanyName("")
                        }}
                        value={companyName}
                        placeholder={"Company name"}
                        id="companyName"
                        name="companyName"
                        type="text"
                        autoComplete="companyName"
                    />
                    <div style={{color: "red"}}>{errorCompanyName}</div>
                </div>
                <button className={"buttonConfirm "} type="submit">
                    Save
                </button>
                <button className={"buttonConfirm buttonCancel"} onClick={() => {
                    nav("../companies")
                }}>
                    Cancel
                </button>
            </form>
        </div>
    </div>
)
}

export default CompanyRegistration;