import React, {useEffect, useState} from "react";
import {CheckPassword} from "../../Utilities/CheckPassword";
import "../EmloyeeRegistration/EmployeeRegistration.css"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"
import {SaveJWT} from "../../Utilities/SaveJWT";
import TagCreation from "../../Components/TagCreation/TagCreation";

function EmployeeEdit() {
    let info = useParams();
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState("employee");
    const [companyTags, setCompanyTags] = useState<{ id: string, title: string }[]>([]);
    const [userTags, setUserTags] = useState<{ id: string, title: string }[]>([]);
    const [isOpenedTagCreation, setIsOpenedTagCreation] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errorFullName, setErrorFullName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword1, setErrorPassword1] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorServer, setErrorServer] = useState('');
    const nav = useNavigate();
    const findRoleById = (companyId: any, companies: any[]) => {
        const company = companies.find(c => c.id == companyId);
        return company ? company.role : null;
    };
    const GetEmployeeData = () => {
        let idC = info.id;
        let idE = info.id2;
        console.log(idC, idE)
        try {
            axios.get(
                "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/" + idC + "/members/" + idE,
                {headers: {Authorization: "Bearer " + SaveJWT()}}
            ).then(res => {
                setFullName(res.data.name)
                setEmail(res.data.email)
                setRole(findRoleById(idC, res.data.companies))
                const select = document.getElementById("rolesSelect");
                let index;
                let rolesSelect = document.getElementById("rolesSelect") as HTMLSelectElement
                for (let i = 0; i < 3; i++) {
                    if (rolesSelect?.children.item(i) == findRoleById(idC, res.data.companies)) {
                        index = i
                    }
                }
                // @ts-ignore
                rolesSelect.selectedIndex = index;
                setPhoneNumber(res.data.phone_number)
                setUserTags(res.data.tags)

            });
        } catch (err) {
            switch (err) {
            }
        }
    }
    const isTagAlreadyAdded = (tagToAdd: { id: string; title: string; }) => {
        return userTags.findIndex(tag => tag.id === tagToAdd.id && tag.title === tagToAdd.title) === -1;
    };

    async function GetTags(jwt: string | null) {
        try {
            const resp = await axios.get(
                "http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/" + info.id + "/tags",
                {headers: {Authorization: "Bearer " + jwt}}
            );
            return resp.data;
        } catch (err) {
            switch (err) {
            }
        }
    }

    function EmployeeEditConfirming() {
        if (role == "owner") return
        if (!RegExp("^[a-zA-Z]{2,20}$").test(fullName?.split(" ")[0] || "")) {
            setErrorFullName("Incorrect First Name")
            return;
        } else setErrorFullName("")
        if (!RegExp("^[a-zA-Z]{2,20}$").test(fullName?.split(" ")[1] || "")) {
            setErrorFullName("Incorrect Last Name")
            return;
        } else setErrorFullName("")
        if (errorFullName != "" || errorEmail != "" || errorPassword1 != "" || errorPassword2 != "" || errorPhoneNumber != "") return;
        setErrorServer("");
        let req = {
            role: role,
            tags: userTags.map((tag) => parseInt(tag.id))
        }
        axios.patch(`http://ec2-3-68-94-147.eu-central-1.compute.amazonaws.com:8000/companies/${info.id}/members/${info.id2}/update`, req,
            {headers: {Authorization: "Bearer " + SaveJWT()}}
        ).then((e) => nav(`../companies/${info.id}`)).catch(err => {
            switch (err.response.status) {
                case 400:
                    setErrorPassword1("Input password has incorrect format");
                    break;
                case 409:
                    setErrorEmail(err.response.detail);
                    break;
                case 422:
                    setErrorServer("One of fields were passed incorrectly");
                    break;
                case 500:
                    setErrorServer("Server is down, try later");
                    break;
            }
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const tags = await GetTags(SaveJWT());
            setCompanyTags(tags)
            console.log(tags)
        };
        GetEmployeeData();
        fetchData();
    }, [])

    return (
        <div>
            <div>
                <div className={"name"}>
                    <label>Edit Member</label>
                </div>
                <form className="form" action="#" method="POST" onSubmit={(e) => {
                    e.preventDefault();
                    EmployeeEditConfirming()
                }}>{errorServer && (
                    <div className="serverError">Error: {errorServer}</div>)}
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="firstName">
                                Full name
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            value={fullName}
                            placeholder={"Full name"}
                            id="firstName"
                            name="firstName"
                            disabled={true}
                            type="text"
                            required
                        />
                        <div style={{color: "red"}}>{errorFullName}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="phone">
                                Phone number
                            </label>
                        </div>
                        <input
                            className={"input"}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                if (!RegExp("^\\+[0-9]{8,}$").test(e.target.value))
                                    setErrorPhoneNumber("Incorrect Phone Number")
                                else
                                    setErrorPhoneNumber("")
                            }}
                            value={phoneNumber}
                            placeholder={"+38(___)___-__-__"}
                            id="phoneNumber"
                            name="phoneNumber"
                            disabled={true}
                            type="tel"
                        />
                        <div style={{color: "red"}}>{errorPhoneNumber}</div>
                    </div>
                    <div className={"block"}>
                        <div className={"label"}>
                            <label htmlFor="email">
                                Email
                            </label>
                            <label style={{color: "red"}}>*</label>
                        </div>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                            if (!RegExp("^[\\w\\.-]+@[\\w\\.-]+\\.[\\w\\.-]+$").test(e.target.value)) {
                                setErrorEmail("Incorrect Email");
                            } else
                                setErrorEmail("")
                        }}
                               value={email}
                               placeholder={"Email"}
                               className={"input"}
                               id="email"
                               name="email"
                               type="email"
                               disabled={true}
                        />
                        <div style={{color: "red"}}>{errorEmail}</div>
                    </div>
                    <select value={role} onChange={(e) => setRole(e.target.value)} id={"rolesSelect"}
                            className={"questionTypeSelect"}>
                        <option value={"employee"}>Employee</option>
                        <option value={"tester"}>Test creator</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                    <div className={"tagsDiv employeeTags"}>
                        <label>Tags Chosen: </label>
                        <div className={"testTagsList"}>
                            {userTags?.map(tag => (
                                <div className={"testTagsDiv"}>
                                    {tag.title}
                                </div>
                            ))}
                        </div>
                        <button style={{marginTop: 25}} onClick={() => {
                            setUserTags([])
                        }} className={"createNewTag testCreationBtn"}>Delete all tags
                        </button>
                    </div>
                    <button className={"buttonConfirm"} type="submit">
                        Confirm
                    </button>
                </form>
            </div>
            <div className={"tagsChoiceDiv"}>
                <div className={"tagsCreationDiv"}>
                    <label>Chose a Tag:</label>
                    <button onClick={() => {
                        setIsOpenedTagCreation(true)
                    }} className={"createNewTag testCreationBtn"}>+ Create new tag
                    </button>
                </div>
                <div className={"tagsTableDiv"}>
                    <table className={"tagsTable"}>
                        <tbody>
                        {companyTags?.map(tag => (
                            <tr className={"tagsTr"} onClick={() => {
                                if (isTagAlreadyAdded(tag)) {
                                    setUserTags(tags => [...tags, {id: tag.id, title: tag.title}]);
                                }
                            }} key={tag.id}>
                                <td className={"tagsNameTd"}>{tag.title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpenedTagCreation &&
                <TagCreation company={info.id} setIsOpenedTagCreation={(res) => setIsOpenedTagCreation(res)}/>}
        </div>
    )
}

export default EmployeeEdit;