import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Company.css";
interface CompanyProps {
    jwt: string;
    companyId: string;
}
interface CompanyData {
    title: string;
    description: string;
    id: number;
    created_at: string;
    staff_count: number;
    owner_email: string;
    owner_phone: string;
    owner_name: string;
    users: {
        id: number;
        name: string;
        email: string;
        phone_number: string;
        role: string;
    }[];
}
function Company({ jwt, companyId }:CompanyProps) {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get(
                    `http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/${companyId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                setCompanyData(response.data);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchCompanyData();
    }, [jwt, companyId]);

    return (
        <div className="main-container">
            <div className="wrapper">
                {companyData ? (
                    <div className="box">
                        <span className="text">{companyData.title}</span>
                        <span className="text-2">Amount of Employees: {companyData.staff_count}</span>
                        <span className="text-3">Owner Name: {companyData.owner_name}</span>
                        <span className="text-4">Owner Email: {companyData.owner_email}</span>
                        <div className="box-2">
                            <span className="text-5">Owner Phone Number: </span>
                            <span className="text-6">{companyData.owner_phone}</span>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                <span className="text-7" onClick={() => navigate(`/companies/${companyId}`)}>
          View Full Profile
        </span>
            </div>
        </div>
    );
}

export default Company;