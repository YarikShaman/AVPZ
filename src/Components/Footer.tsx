import fbIcon from "../Imges/facebookIcon.svg"
import inIcon from "../Imges/linkedinIcon.svg"
import xIcon from "../Imges/xIcon.svg"
function Footer(){
    return(
        <div className={"buttons footer"}>
            <div className={"contactBlock"}>
                <div className={"linkBlock"}>
                    <label className={"linkPolicy"}>Private policy</label>
                    <label className={"linkPolicy"}>Terms & Conditions</label>
                </div>
                <div className={"linkBlock"}>
                    <label >Contact Us</label>
                    <label className={"linkFooter"}>+380 (66) 111-11-16</label>
                    <label className={"linkFooter"}>testeam@gmail.com</label>
                </div>
                <div>
                    <label className={"linkBlock"}>Stay Connected</label>
                    <div>
                        <img src={fbIcon} className={"icon"}></img>
                        <img src={inIcon} className={"icon"}></img>
                        <img src={xIcon} className={"icon"}></img>
                    </div>
                </div>
            </div>
            <label className={"copyright"}>Copyright 2023 tesTeam ⓒ All rights reserved</label>
        </div>
    )
}
export default Footer;