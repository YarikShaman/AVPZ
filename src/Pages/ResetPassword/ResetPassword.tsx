import {useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [emailDelay, setEmailDelay] = useState(15000)
    const [isSent, setIsSent] = useState(false);
    const nav = useNavigate()

    function EmailSend(email: string) {
        if (isSent) return;
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/auth/forgot-password/", {
            email: email
        }).catch((err) => {
            switch (err.response.status) {
                case 400:
                    setErrorEmail("User with this email is not registered in the system");
                    break;
                case 422:
                    setErrorEmail(err.response.detail.msg);
                    break;
                case 500:
                    setErrorEmail("Server is down, try later");
                    break;
            }
        }).then(() => {
            setIsSent(true);
        })
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, emailDelay);
        setEmailDelay(emailDelay * 4);

    }

    return (
        <div style={{minHeight:"417px"}}>
            <div className={"nameReset"}>
                <label>Reset Your Password</label>
            </div>
            <form className="form" action="#" method="POST" onSubmit={(e) => {
                e.preventDefault();
                EmailSend(email)
            }}>
                <div className={"blockReset"}>
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
                <button disabled={isButtonDisabled} className={"button"} type={"submit"}>Continiue</button>
            </form>
            <button className={"buttonBack"} onClick={() => {
                nav("/login")
            }}>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 7.99905C20 8.30208 19.8736 8.59269 19.6485 8.80697C19.4235 9.02124 19.1183 9.14162 18.8001 9.14162H4.10075L9.25251 14.0461C9.47793 14.2608 9.60457 14.5519 9.60457 14.8554C9.60457 15.159 9.47793 15.4501 9.25251 15.6648C9.02708 15.8794 8.72134 16 8.40255 16C8.08375 16 7.77801 15.8794 7.55259 15.6648L0.35293 8.80932C0.241063 8.70317 0.152303 8.57704 0.0917391 8.43816C0.0311755 8.29928 0 8.15038 0 8C0 7.84962 0.0311755 7.70072 0.0917391 7.56184C0.152303 7.42296 0.241063 7.29682 0.35293 7.19068L7.55259 0.335232C7.66421 0.228951 7.79672 0.144643 7.94255 0.0871239C8.08839 0.0296046 8.2447 0 8.40255 0C8.5604 0 8.71671 0.0296046 8.86254 0.0871239C9.00838 0.144643 9.14089 0.228951 9.25251 0.335232C9.36413 0.441514 9.45267 0.567689 9.51307 0.706553C9.57348 0.845417 9.60457 0.99425 9.60457 1.14456C9.60457 1.29486 9.57348 1.44369 9.51307 1.58256C9.45267 1.72142 9.36413 1.8476 9.25251 1.95388L4.10075 6.85647H18.8001C19.1183 6.85647 19.4235 6.97685 19.6485 7.19112C19.8736 7.4054 20 7.69602 20 7.99905Z"
                        fill="#1E1E1E"/>
                </svg>
                <label className={"labelBack"}> Back to log in</label></button>
            {isSent && (
                <div className="successMessage">
                    Email has been sent! Check your inbox.
                </div>
            )}
        </div>
    )
}

export default ResetPassword;