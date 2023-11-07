import React from "react";
import styles from './ContactUs.module.css'
import global from "../../Global.module.css"
import contactUsImg from '../../Img/ContactUs/ContactUsImg.svg'

export default function ContactUs(){


    return(
    <div className={styles.mainBackground}>
        <div className={styles.contactDiv}>
            <div className={`${global.titleText} ${styles.contactDivTitle}`}>Do you have any questions?</div>
            <div className={styles.contactDivContent}>
                <div className={styles.contactDivContentText}>
                    <div className={styles.contactDivContentTextLeftCol}>
                        <div className={styles.textSmallBlue}>Phone number:</div>
                        <div className={`${styles.textSmallBlue} ${styles.textMargin}`}>Email:</div>
                    </div>
                    <div className={styles.contactDivContentRightCol}>
                        <div className={styles.textSmallBlack}>+380 (66) 111-11-16</div>
                        <div className={`${styles.textSmallBlack} ${styles.textMargin}`}>testeam@gmail.com</div>
                    </div>
                </div>
                <img src={contactUsImg}/>
            </div>
        </div>
    </div>
    )
}