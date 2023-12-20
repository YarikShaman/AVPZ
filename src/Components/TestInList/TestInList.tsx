import React from "react";
import styles from "./TestInList.module.css"
import {Test} from "../Interface/ListOfTestsData";
import {useNavigate} from "react-router-dom";

interface Params{
    test:Test;
    visibility:boolean
}

export default function TestInList( params:Params){
    const nav = useNavigate();
    const test = params.test

    return(
        <div className={styles.mainDiv}>
            <div className={styles.test}>
                <div className={styles.testTitle}>
                    <div onClick={()=>{nav("/tests/"+params.test.id)}} className={styles.testTitleName}>{test.title}</div>
                    {params.visibility&&
                    <div className={styles.testTitleButtons}>
                        <div className={styles.testTitleButtonsEdit}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17.0129L11.413 16.9979L21.045 7.4579C21.423 7.0799 21.631 6.5779 21.631 6.0439C21.631 5.5099 21.423 5.0079 21.045 4.6299L19.459 3.0439C18.703 2.2879 17.384 2.2919 16.634 3.0409L7 12.5829V17.0129ZM18.045 4.4579L19.634 6.0409L18.037 7.6229L16.451 6.0379L18.045 4.4579ZM9 13.4169L15.03 7.4439L16.616 9.0299L10.587 15.0009L9 15.0059V13.4169Z" fill="#FFFEFE"/>
                                <path d="M5 21H19C20.103 21 21 20.103 21 19V10.332L19 12.332V19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21Z" fill="#FFFEFE"/>
                            </svg>
                            Edit Test
                        </div>
                        <div className={styles.testTitleButtonsDelete}>
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.625 3H10.375C10.375 2.50272 10.1775 2.02581 9.82582 1.67417C9.47419 1.32254 8.99728 1.125 8.5 1.125C8.00272 1.125 7.52581 1.32254 7.17417 1.67417C6.82254 2.02581 6.625 2.50272 6.625 3ZM5.5 3C5.5 2.20435 5.81607 1.44129 6.37868 0.87868C6.94129 0.316071 7.70435 0 8.5 0C9.29565 0 10.0587 0.316071 10.6213 0.87868C11.1839 1.44129 11.5 2.20435 11.5 3H16.1875C16.3367 3 16.4798 3.05926 16.5852 3.16475C16.6907 3.27024 16.75 3.41332 16.75 3.5625C16.75 3.71168 16.6907 3.85476 16.5852 3.96025C16.4798 4.06574 16.3367 4.125 16.1875 4.125H15.205L14.2922 15.0773C14.2258 15.874 13.8624 16.6167 13.2741 17.1581C12.6858 17.6994 11.9155 17.9999 11.116 18H5.884C5.08449 17.9999 4.3142 17.6994 3.72588 17.1581C3.13755 16.6167 2.77416 15.874 2.70775 15.0773L1.795 4.125H0.8125C0.663316 4.125 0.520242 4.06574 0.414752 3.96025C0.309263 3.85476 0.25 3.71168 0.25 3.5625C0.25 3.41332 0.309263 3.27024 0.414752 3.16475C0.520242 3.05926 0.663316 3 0.8125 3H5.5ZM3.829 14.9835C3.87189 15.4991 4.10697 15.9797 4.48761 16.33C4.86825 16.6804 5.36666 16.8749 5.884 16.875H11.116C11.6333 16.8749 12.1317 16.6804 12.5124 16.33C12.893 15.9797 13.1281 15.4991 13.171 14.9835L14.077 4.125H2.92375L3.829 14.9835ZM6.8125 6.75C6.96168 6.75 7.10476 6.80926 7.21025 6.91475C7.31574 7.02024 7.375 7.16332 7.375 7.3125V13.6875C7.375 13.8367 7.31574 13.9798 7.21025 14.0852C7.10476 14.1907 6.96168 14.25 6.8125 14.25C6.66332 14.25 6.52024 14.1907 6.41475 14.0852C6.30926 13.9798 6.25 13.8367 6.25 13.6875V7.3125C6.25 7.16332 6.30926 7.02024 6.41475 6.91475C6.52024 6.80926 6.66332 6.75 6.8125 6.75ZM10.75 7.3125C10.75 7.16332 10.6907 7.02024 10.5852 6.91475C10.4798 6.80926 10.3367 6.75 10.1875 6.75C10.0383 6.75 9.89524 6.80926 9.78975 6.91475C9.68426 7.02024 9.625 7.16332 9.625 7.3125V13.6875C9.625 13.8367 9.68426 13.9798 9.78975 14.0852C9.89524 14.1907 10.0383 14.25 10.1875 14.25C10.3367 14.25 10.4798 14.1907 10.5852 14.0852C10.6907 13.9798 10.75 13.8367 10.75 13.6875V7.3125Z" fill="#FFFEFE"/>
                            </svg>
                            Delete
                        </div>
                    </div>}
                </div>
                <div className={styles.testTime}>
                    <div>Start Date: {test.start_date}, {test.start_time}</div>
                    <div>End Date: {test.end_date}, {test.end_time}</div>
                    <div>Time Limit: 30 min</div>
                </div>
                <div className={styles.testDescription}>
                    {test.title}{test.title}{test.title}{test.title}{test.title}
                    {test.title}{test.title}{test.title}{test.title}{test.title}
                </div>
                <div className={styles.testTags}>
                    {
                        test.tags.map((tag)=>{
                            return(
                                <div className={styles.tag}>{tag.title}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

}