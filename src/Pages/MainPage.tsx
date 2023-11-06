import React from "react";
import styles from './MainPage.module.css'

function MainPage() {
    return <>
        <div className={styles.mainBackground}>
            <div className={styles.threeDivs}>
                <div className={styles.learnMoreDiv}></div>
                <div className={styles.picturesDiv}></div>
                <div className={styles.signUpDiv}></div>
            </div>
            <div className={styles.contactUsDiv}></div>
        </div>
    </>
}

export default MainPage;