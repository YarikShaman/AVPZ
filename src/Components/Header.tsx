import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "../Styles/Header.css"
import UserPic from "../Imges/profilePicture.svg"

function Header() {
    let nav = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const exclusion = ["/login","/signup", "/forgot_password"]

    function getName(jwt:string|null) {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/",
            {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp => {
                setName(resp.data.name);
            }
        ).catch(err=>{
            switch (err){
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    break;
            }
        })
    }

    useEffect(() => {
        if (name === "") {
            if (!!localStorage.getItem("jwt")) {
                getName(localStorage.getItem("jwt"));
            } else if (!!sessionStorage.getItem("jwt")) {
                getName(sessionStorage.getItem("jwt"));
            } else if (!exclusion.includes(location.pathname)) {
                nav("/login");
            }
        }
    })

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
                        nav("/contactUs")
                    }} className={"headerBtn button"}>Contact Us
                    </button>
                    <img onClick={() => {
                        nav("/profile")
                    }} className={"userPic"} src={UserPic}></img>
                </div>}
            {name == "" &&
                <div className={"buttons"}>
                    <button
                        onClick={() => {
                            nav("/contactUs")
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