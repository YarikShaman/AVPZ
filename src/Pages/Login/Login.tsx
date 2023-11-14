import {useState} from "react";
import "../Registration/Registration.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorServer, setErrorServer] = useState('');
    const [isRemember, setIsRemember] = useState(false);
    const nav = useNavigate();
    function LoginConfirming(
        email: string,
        password: string) {
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/auth/login/", {
            email: email,
            password: password
        }).then(resp => {
            if (isRemember) localStorage["jwt"] = resp.data.token;
            else sessionStorage["jwt"] = resp.data.token;
            nav("../");
        }).catch(err => {
            switch (err.response.status) {
                case 400:
                    setErrorPassword("Invalid password");
                    break;
                case 404:
                    setErrorEmail(err.response.detail);
                    break;
                case 422:
                    setErrorServer(err.response.detail)
                    break;
                case 500:
                    setErrorServer("Server is down, try later")
                    break;
            }
        });
    }

    return (
            <div className={"login"}>
                <div className={"name"}>
                    <label>Login </label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    LoginConfirming(email, password)
                }}>{errorServer && (
                    <div className="serverError">Error: {errorServer}</div>)}
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
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                placeholder={"Password"}
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                className={"buttonShow"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword)
                                }}>
                                {showPassword ?
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
                        <div style={{color: "red"}}>{errorPassword}</div>
                    </div>
                    <div className={"lowerDiv"}>
                        <div className={"rememberMe"}>
                            <input
                                type={"checkbox"}
                                checked={isRemember}
                                onChange={() => {
                                    setIsRemember(!isRemember)
                                }
                                }
                            />
                            <label>Remember me</label>
                        </div>
                        <a href={"/forgot_password"}>
                            Forgot your password?
                        </a>
                    </div>
                    <button className={"buttonConfirm"} type="submit">
                        Confirm
                    </button>
                </form>
                <div className={"loginRedirect"}>
                    <label>Don`t have an account? </label>
                    <a href={"/signup"}>
                        Sign up
                    </a>
                </div>
            </div>
    )
}

export default Login;