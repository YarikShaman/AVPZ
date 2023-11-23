import React, {useEffect, useState} from "react";
import "../Registration/Registration.css"
import global from '../../Global.module.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserData from "../../Components/Interface/UserData"
import { SaveJWT } from "../../Utilities/SaveJWT";

export default function EditProfile() {
    const [data, setData] = useState<UserData>()
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorServer, setErrorServer] = useState('');
    const nav = useNavigate()
    useEffect(() => {
        let jwt = SaveJWT();
        GetData(jwt);
    }, [])

    function GetData(jwt: string | null) {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/", {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp => {
                setData(resp.data);
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

    function EditConfirming(data:UserData|undefined) {
        if (!RegExp("^[a-zA-Z]{2,20}$").test(data?.name.split(" ")[0]||"")) {
            setErrorFirstName("Incorrect First Name")
            return;
        } else setErrorFirstName("")
        if (!RegExp("^[a-zA-Z]{2,20}$").test(data?.name.split(" ")[1]||"")) {
            setErrorFirstName("Incorrect Last Name")
            return;
        }else setErrorFirstName("")
        if (data?.name.indexOf(" ")!=data?.name.lastIndexOf(" ")) {
            setErrorFirstName("Incorrect Name")
            return;
        }else setErrorFirstName("")
        if (!RegExp("^\\+[0-9]{8,}$").test(data?.phone_number||"")) {
            setErrorPhoneNumber("Incorrect Phone Number")
            return;
        } else setErrorPhoneNumber("")
        axios.patch("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/edit/", {
            name: data?.name,
            phone_number: data?.phone_number
        }, {headers: {Authorization: "Bearer " + SaveJWT()}}).then(()=>{
            nav("../")
        }).catch((res)=>{
            switch (res){
                case 400: setErrorServer("Incorrect "+res.detail.field); break;
                case 401: setErrorServer("Server Error"); break;
                case 405: setErrorServer(res.detail.msg); break;
                case 422: setErrorServer(res.detail.msg); break;
                case 500: setErrorServer("Server Error"); break;
            }
        })
        console.log(data)
    }

    return (
        <div>
            <div style={{minHeight:504, marginTop:100}}>
                <div className={"name"}>
                    <label>Edit Profile</label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    EditConfirming(data)
                }}>{errorServer && (
                    <div className="serverError">Error: {errorServer}</div>)}
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="firstName">
                                Full Name
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setData({
                                    ...data!,
                                    name: e.target.value,
                                })
                            }}
                            value={data?.name}
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
                            <label htmlFor="phone">
                                Phone number
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setData({
                                    ...data!,
                                    phone_number: e.target.value,
                                })
                            }}
                            value={data?.phone_number}
                            placeholder={"+38(___)___-__-__"}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                        />
                        <div style={{color: "red"}}>{errorPhoneNumber}</div>
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