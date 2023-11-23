import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./CompaniesList.css"
import Company from "../../Components/CompanyInList/Company";
import { SaveJWT } from "../../Utilities/SaveJWT";
interface Company {
    id: number;
    title: string;
    role: string;
}
function CompaniesList() {
    const nav = useNavigate()
    const [companies, setCompanies] = useState<Company[]>([]);
    function GetData(jwt: string | null) {
        axios.get(
            "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/profile/companies", {headers: {Authorization: "Bearer " + jwt}}
        ).then(
            resp => {
                setCompanies(resp.data);
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

    useEffect(()=>{
        GetData(SaveJWT());

    },[])
    return (
        <div className={"compDiv"}>
            <div className={"compLabel"}>
                <label >List of Companies</label>
            </div>
            <div>{companies.map((company) => (
                <Company key={company.id} jwt={SaveJWT()} companyId={company.id.toString()} />
            ))}
            </div>
            <button onClick={()=>{nav("/companies/create")}} className={"button addMoreBtn"}>+ Add More</button>
        </div>
    )
}

export default CompaniesList;