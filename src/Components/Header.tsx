import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "../Styles/Header.css"
export function Header() {
    let nav = useNavigate();
    const location = useLocation();
    const [jwt, setJwt] = useState("");
    const [name, setName] = useState("");
    function getName(){
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/",
            {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp =>{
                setName(resp.data.name);
            }
        )
    }
    useEffect(()=>{
        if(localStorage.jwt!=undefined){
            setJwt(localStorage.jwt);
            getName();
        } else if(sessionStorage.jwt!=undefined){
            setJwt(sessionStorage.jwt);
            getName();
        }else if(location.pathname!="/login" && location.pathname!="/signup"){
            nav("/login");
        } else{
        }
    })

    return (
        <div className={"header"}>
            <div className={"siteName"}>
                <label className={"namePart"}>tesT</label>
                <label>eam</label>
            </div>
            <div className={"unauthorizedButtons"}>
                <button
                    className={"contactUsBtn button"}>Contact Us</button>
                <button
                    onClick={()=>nav("/login")}
                    className={"loginBtn button"}>Login</button>
            </div>
        </div>
    );
}
export default Header;