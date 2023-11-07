import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../Styles/ResetPassword.css";
import { CheckPassword } from "../Utilities/CheckPassword";

function ResetPasswordContinue() {
    const [isValid, setIsValid] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");
    const [errorServer, setErrorServer] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const q = window.location.search.substring(3);
    const nav = useNavigate();
    useEffect(()=> {
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/auth/forgot-password/verify-code/?code="+q).then((res)=>{
            if(res.data.status==="Valid"){
                setIsValid(!isValid);
            }
        }).catch((err)=>{
            switch (err.response.status) {
                case 400:
                    setErrorCode("Code has expired!");
                    break;
                case 500:
                    setErrorCode("Server is down, try later!")
                    break;
            }
        })
    },[])
    function PasswordChange(){
        if(errorPassword1=="" && errorPassword2==""){
            axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/auth/forgot-password/reset/?code="+q,{
                new_password:password1
            }).then(()=>
                nav("/login")
            ).catch((err)=>{
                switch (err.response.status) {
                    case 400:
                        setErrorPassword1("Invalid password");
                        break;
                    case 500:
                        setErrorServer("Server is down, try later")
                        break;
                }
            })
        }
    }
    return(
        <div>
            {isValid && <div>
                <div className={"nameReset"}>
                    <label>Reset Your Password </label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    PasswordChange()
                }}>
                <div className={"block"}>
                    <div className={"label"}>
                        <label htmlFor="password">
                            New password
                        </label>
                        <label style={{color: "red"}}>*</label>
                    </div>
                    <div>
                        <input
                            className={"input password"}
                            onChange={(e) => {
                                setPassword1(e.target.value)
                                setErrorPassword1(CheckPassword(e.target.value).res)
                            }}
                            value={password1}
                            placeholder={"Password"}
                            id="password"
                            name="password"
                            type={showPassword1 ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                        />
                        <button
                            className={"buttonShow"}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPassword1(!showPassword1)
                            }}>
                            {showPassword1 ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="black" className=" w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       strokeWidth="1.5" stroke="black" className=" w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                </svg>
                            }
                        </button>
                    </div>
                    <div style={{color: "red"}}>{errorPassword1}</div>
                </div>
                <div className={"block"}>
                    <div className={"label"}>
                        <label htmlFor="password">
                            Confirm new password
                        </label>
                        <label style={{color: "red"}}>*</label>
                    </div>
                    <div>
                        <input
                            className={"input password"}
                            onChange={(e) => {
                                setPassword2(e.target.value)
                                if (password1 != e.target.value)
                                    setErrorPassword2("Password mismatch")
                                else setErrorPassword2("")
                            }}
                            value={password2}
                            placeholder={"Password "}
                            id="password-repeat"
                            name="password-repeat"
                            type={showPassword2 ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                        />
                        <button
                            className={"buttonShow"}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPassword2(!showPassword2)
                            }}>
                            {showPassword2 ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="black">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       strokeWidth="1.5" stroke="black">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                </svg>
                            }
                        </button>
                    </div>
                    <div style={{color: "red"}}>{errorPassword2}</div>
                </div>
                <button className={"buttonConfirm buttonConfirmReset "} type="submit">
                    Confirm
                </button>
                </form>
            </div>}
            {!isValid && <div className={"errorCode"}>
                <label>Error!</label>
                <label>{errorCode}</label>
            </div>}
        </div>
    )
}
export default ResetPasswordContinue;