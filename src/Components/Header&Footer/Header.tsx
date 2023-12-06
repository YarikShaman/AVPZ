import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import "./Header.css"
import UserPic from "../../Img/profilePicture.svg"
import { SaveJWT } from "../../Utilities/SaveJWT";

function Header() {
    let nav = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const exclusion = ["/login","/signup", "/forgot_password","/forgot_password/reset/"]

    function getName() {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/",{headers: {Authorization: "Bearer " + SaveJWT()}}

        ).then(
            resp => {
                setName(resp.data.name);
            }
        ).catch(err=>{
            switch (err.response.status){
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
                case 500:
                    break;
            }
        })
    }

    useEffect(() => {
        if (name === "") {
            getName()
            if(SaveJWT()=="error")
            if (!exclusion.includes(location.pathname)) {
                console.log(exclusion.includes(location.pathname))
            }
        }
    },[])

    return (
        <div className={"header"}>
            <div onClick={()=>{nav("/")}} className={"siteName buttons"}>
                <label className={"namePart"}>tesT</label>
                <label>eam</label>
            </div>
            {name != "" &&
                <div className={"buttons"}>
                    <button onClick={() => {
                        nav("/companies")
                    }} className={"headerBtn button"}>Companies
                    </button>
                    <button onClick={() => {
                        nav("/tests")
                    }} className={"headerBtn button"}>Tests
                    </button>
                    <button onClick={() => {
                        nav("/statistics")
                    }} className={"headerBtn button"}>Statistics
                    </button>
                    <button onClick={() => {
                        nav("/contact")
                    }} className={"headerBtn button"}>Contact Us
                    </button>
                    <img onClick={() => {
                        nav("/user_profile")
                    }} className={"userPic"} src={UserPic}></img>
                </div>}
            {name == "" &&
                <div className={"buttons"}>
                    <button
                        onClick={() => {
                            nav("/contact")
                        }}
                        className={"contactUsBtn button"}>Contact Us
                    </button>
                    <button
                        onClick={() => nav("/login")}
                        className={"loginBtn button"}>Login
                    </button>
                </div>}
        </div>
    );
}

export default Header;