import axios from "axios";
import React, {useEffect, useState} from "react";
import { SaveJWT } from "../../Utilities/SaveJWT";
export default function TagCreation(info:{company:string|undefined,setIsOpenedTagCreation:(arg0:boolean)=>void}){

    const [tagName, setTagName] = useState("");
    const [tagDescription, setTagDescription] = useState("");
    const [errorTagName, setErrorTagName] = useState("");
    const [errorTagDescription, setErrorTagDescription] = useState("");
    const handleCreateTag = () =>{
        let request = {
            title:tagName,
            description:tagDescription,
            company_id:info.company
        }
        axios.post("http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/tags/create/",
            request,
            { headers: { Authorization: "Bearer " + SaveJWT() } }
        ).catch((err)=>{
            switch (err.response.status){
                case 400: if(err.response.data.detail.field=="title") setErrorTagName(err.response.data.detail.message);
                    else if(err.response.data.detail.field=="description") setErrorTagDescription(err.response.data.detail.message);
                    break;
                case 409: if(err.response.data.detail.field=="title") setErrorTagName(err.response.data.detail.message);
                else if(err.response.data.detail.field=="description") setErrorTagDescription(err.response.data.detail.message);
                    break;
            }
        })

    }
    useEffect(()=>{
    })
    return(
<div className={"newTagDiv"}>
    <div className={"innerNewTagDiv"}>
        <div onClick={() => {
            info.setIsOpenedTagCreation(false)
        }} className={"createTagBtnClose"}>
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 19L19 1L1 19ZM1 1L19 19L1 1Z" fill="#717070"/>
                <path d="M1 19L19 1M1 1L19 19" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <label className={"createTagLabelBig"}>Create a New Tag</label>
        <label className={"createTagLabelSmall"}>Tag Name</label>
        <input onChange={(e)=>{setTagName(e.target.value)}} placeholder={"Tag Name"} className={"createTagInput"}/>
        <div style={{color: "red"}}>{errorTagName}</div>
        <label className={"createTagLabelSmall"}>Tag Description</label>
        <input onChange={(e)=>{setTagDescription(e.target.value)}} placeholder={"Tag Description"} className={"createTagInput"}/>
        <div style={{color: "red"}}>{errorTagDescription}</div>
        <button onClick={handleCreateTag} className={"testCreationBtn btnConfirmNewTag"}>Confirm</button>
    </div>
</div>)}