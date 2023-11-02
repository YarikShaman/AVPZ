import fbIcon from "../Imges/facebookIcon.svg"
import inIcon from "../Imges/linkedinIcon.svg"
import xIcon from "../Imges/xIcon.svg"
import fbIcon2 from "../Imges/facebookIcon2.svg"
import inIcon2 from "../Imges/linkedinIcon2.svg"
import xIcon2 from "../Imges/xIcon2.svg"

function Footer() {
    return (
        <div className={"buttons footer"}>
            <div className={"contactBlock"}>
                <div className={"linkBlock"}>
                    <label className={"linkPolicy"}>Private policy</label>
                    <label className={"linkPolicy"}>Terms & Conditions</label>
                </div>
                <div className={"linkBlock"}>
                    <label>Contact Us</label>
                    <a href={"tel:+380661111116"} className={"linkFooter"}>+380 (66) 111-11-16</a>
                    <a href={"mailto:testeam@gmail.com"} className={"linkFooter"}>testeam@gmail.com</a>
                </div>
                <div>
                    <label className={"linkBlock"}>Stay Connected</label>
                    <div>
                        <a href={"https://facebook.com"} className={"icon2 iconFb"}>
                            <img src={fbIcon} className={"icon"}></img>
                        </a>
                        <a href={"https://linkedin.com"} className={"icon2 iconIn"}>
                            <img src={inIcon} className={"icon"}></img>
                        </a>
                        <a href={"https://x.com"} className={"icon2 iconX"}>
                            <img src={xIcon} className={"icon"}></img>
                        </a>
                    </div>
                </div>
            </div>
            <label className={"copyright"}>Copyright 2023 tesTeam ⓒ All rights reserved</label>
        </div>
    )
}

export default Footer;