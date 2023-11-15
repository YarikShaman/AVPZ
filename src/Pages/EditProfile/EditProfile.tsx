import React, {useEffect, useState} from "react";
import "../Registration/Registration.css"
import global from '../../Global.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function EditProfile() {
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errorCompanyName, setErrorCompanyName] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("")
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorServer, setErrorServer] = useState('');
    const nav = useNavigate()

    function EditConfirming(
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string) {
        if (!RegExp("^[a-zA-Z]{2,20}$").test(firstName)) {
            setErrorFirstName("Incorrect First Name")
            return;
        }
        if (!RegExp("^[a-zA-Z]{2,20}$").test(lastName)) {
            setErrorLastName("Incorrect Last Name")
            return;
        }
        if (!RegExp("^\\+[0-9]{8,}$").test(phoneNumber)) {
            setErrorPhoneNumber("Incorrect Phone Number")
            return;
        }
        if (!RegExp("^[\\w\\.-]+@[\\w\\.-]+\\.[\\w\\.-]+$").test(email)) {
            setErrorEmail("Incorrect Email");
            return;
        }
        nav("../user_profile")
    }

    return (
        <div>
            <div>
                <div className={"name"}>
                    <label>Edit Profile</label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    EditConfirming(email, firstName, lastName, phoneNumber)
                }}>{errorServer && (
                    <div className="serverError">Error: {errorServer}</div>)}
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="firstName">
                                First name
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            value={firstName}
                            placeholder={"First name"}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="firstName"
                        />
                        <div style={{color: "red"}}>{errorFirstName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="LastName">
                                Last name
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            value={lastName}
                            placeholder={"Last name"}
                            id="LastName"
                            name="LastName"
                            type="text"
                            autoComplete="LastName"
                        />
                        <div style={{color: "red"}}>{errorLastName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="phone">
                                Phone number
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                            value={phoneNumber}
                            placeholder={"+38(___)___-__-__"}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                        />
                        <div style={{color: "red"}}>{errorPhoneNumber}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="email">
                                Email
                            </label>
                        </div>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                               value={email}
                               placeholder={"Email"}
                               className={"input"}
                               id="email"
                               name="email"
                               type="email"
                               autoComplete="email"
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>
                    <div>
                        <button className={"buttonConfirm "} type="submit">
                            Save
                        </button>
                        <button className={"buttonConfirm buttonCancel"} onClick={() => {
                            nav("../user_profile")
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}