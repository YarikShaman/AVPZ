import {useState} from "react";
import {CheckPassword} from "../Utilities/CheckPassword";
import "../Styles/Registration.css"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Header from "../Components/Header"

function Registration() {
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

    function RegistrationConfirming(
        email: string,
        password: string,
        companyName: string,
        firstName: string,
        lastName: string,
        phoneNumber: string) {
        setErrorServer("");
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/auth/signup/", {
            email: email,
            name: firstName + " " + lastName,
            password: password,
        }).then(resp => {
            nav("../");
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setErrorPassword1("Input password has incorrect format");
                    break;
                case 409:
                    setErrorEmail(err.response.detail);
                    break;
                case 422:
                    setErrorServer("One of fields were passed incorrectly");
                    break;
                case 500:
                    setErrorServer("Server is down, try later");
                    break;
            }
        });
    }

    return (
        <div>
            <Header/>
            <div>
                <div className={"name"}>
                    <label>Sign Up </label>
                    <label className={"namePart2"}>Your Company</label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    RegistrationConfirming(email, password1, companyName, firstName, lastName, phoneNumber)
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
                            required
                        />
                        <div style={{color: "red"}}>{errorCompanyName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="firstName">
                                First name
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                if (!RegExp("^[a-zA-Z]{2,20}$").test(e.target.value))
                                    setErrorFirstName("Incorrect First Name")
                                else
                                    setErrorFirstName("")
                            }}
                            value={firstName}
                            placeholder={"First name"}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="firstName"
                            required
                        />
                        <div style={{color: "red"}}>{errorFirstName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="LastName">
                                Last name
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                if (!RegExp("^[a-zA-Z]{2,20}$").test(e.target.value))
                                    setErrorLastName("Incorrect Last Name")
                                else
                                    setErrorLastName("")
                            }}
                            value={lastName}
                            placeholder={"Last name"}
                            id="LastName"
                            name="LastName"
                            type="text"
                            autoComplete="LastName"
                            required
                        />
                        <div style={{color: "red"}}>{errorLastName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="phone">
                                Phone number
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                if (!RegExp("^\\+[0-9]{8,}$").test(e.target.value))
                                    setErrorPhoneNumber("Incorrect Phone Number")
                                else
                                    setErrorPhoneNumber("")
                            }}
                            value={phoneNumber}
                            placeholder={"+38(___)___-__-__"}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                            required
                        />
                        <div style={{color: "red"}}>{errorPhoneNumber}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="email">
                                Email
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                            if (!RegExp("^[\\w\\.-]+@[\\w\\.-]+\\.[\\w\\.-]+$").test(e.target.value)) {
                                setErrorEmail("Incorrect Email");
                            } else
                                setErrorEmail("")
                        }}
                               value={email}
                               placeholder={"Email"}
                               className={"input"}
                               id="email"
                               name="email"
                               type="email"
                               autoComplete="email"
                               required
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>

                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="password">
                                Password
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
                                Confirm password
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
                    <button className={"buttonConfirm"} type="submit">
                        Confirm
                    </button>
                </form>
                <div className={"loginRedirect"}>
                    <label>Do you have an account? </label>
                    <a href={"/login"}>
                        Log in
                    </a>
                </div>
            </div>
            <p>Footer</p>
        </div>
    )
}

export default Registration;