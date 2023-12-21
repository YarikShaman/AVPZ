import React, {useEffect, useState} from "react";
import "./QuestionInTestCreate.css"
import OptionInTestCreate from "./OptionInTestCreate";

interface Option {
    title: string,
    is_correct: boolean,
    index: number,
}

interface Question {
    title: string,
    answers: Option[],
    type: string,
    index: number,
}

function QuestionInTestCreate(info: { removeQuestion: (arg0: number) => void; isLast: boolean; index: number, changeOption: (arg0: Question) => void }) {
    const [type, setType] = useState<string>("single_choice");
    const [questionName, setQuestionName] = useState<string>("");
    const [data, setData] = useState<Option[]>([]);

    const handleOptionDataChange = (updatedOption: Option) => {
        const index = updatedOption.index;
        const updatedData = [...data];
        updatedData[index] = updatedOption;
        setData(updatedData);
    };

    const handleRemoveElement = () => {
        setData((prevData) => {
            return prevData.filter((option) => option.index !== prevData.length - 1);
        });
    };

    const handleAddElement = () => {
        const newIndex = data.length;
        const newOption: Option = {
            title: "",
            is_correct: false,
            index: newIndex,
        };
        setData((prevData) => [...prevData, newOption]);
    };
    useEffect(() => {
        info.changeOption({
            title: questionName,
            answers: data,
            type: type,
            index: info.index
        })
    }, [data, type, questionName])

    return (
        <div className={"questionCreationDiv"}>
            <svg onClick={() => info.removeQuestion(info.index)} className={"deleteSvg"} width="20" height="22"
                 viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.85725 4.14244H12.143C12.143 3.57412 11.9172 3.02907 11.5153 2.62721C11.1135 2.22535 10.5684 1.99958 10.0001 1.99958C9.43178 1.99958 8.88674 2.22535 8.48488 2.62721C8.08301 3.02907 7.85725 3.57412 7.85725 4.14244ZM6.57153 4.14244C6.57153 3.23312 6.93276 2.36105 7.57574 1.71807C8.21872 1.07509 9.09079 0.713867 10.0001 0.713867C10.9094 0.713867 11.7815 1.07509 12.4245 1.71807C13.0675 2.36105 13.4287 3.23312 13.4287 4.14244H18.7858C18.9563 4.14244 19.1198 4.21017 19.2404 4.33073C19.3609 4.45129 19.4287 4.6148 19.4287 4.7853C19.4287 4.95579 19.3609 5.11931 19.2404 5.23986C19.1198 5.36042 18.9563 5.42815 18.7858 5.42815H17.663L16.6198 17.945C16.5439 18.8556 16.1286 19.7044 15.4562 20.3231C14.7839 20.9418 13.9035 21.2852 12.9898 21.2853H7.01039C6.09667 21.2852 5.21634 20.9418 4.54397 20.3231C3.87159 19.7044 3.45628 18.8556 3.38039 17.945L2.33725 5.42815H1.21439C1.04389 5.42815 0.880381 5.36042 0.759822 5.23986C0.639263 5.11931 0.571533 4.95579 0.571533 4.7853C0.571533 4.6148 0.639263 4.45129 0.759822 4.33073C0.880381 4.21017 1.04389 4.14244 1.21439 4.14244H6.57153ZM4.66182 17.8379C4.71084 18.4271 4.9795 18.9763 5.41452 19.3768C5.84954 19.7772 6.41915 19.9995 7.01039 19.9996H12.9898C13.5811 19.9995 14.1507 19.7772 14.5857 19.3768C15.0207 18.9763 15.2894 18.4271 15.3384 17.8379L16.3738 5.42815H3.62725L4.66182 17.8379ZM8.07153 8.42815C8.24203 8.42815 8.40554 8.49588 8.5261 8.61644C8.64666 8.737 8.71439 8.90051 8.71439 9.07101V16.3567C8.71439 16.5272 8.64666 16.6907 8.5261 16.8113C8.40554 16.9319 8.24203 16.9996 8.07153 16.9996C7.90104 16.9996 7.73752 16.9319 7.61696 16.8113C7.49641 16.6907 7.42868 16.5272 7.42868 16.3567V9.07101C7.42868 8.90051 7.49641 8.737 7.61696 8.61644C7.73752 8.49588 7.90104 8.42815 8.07153 8.42815ZM12.5715 9.07101C12.5715 8.90051 12.5038 8.737 12.3832 8.61644C12.2627 8.49588 12.0992 8.42815 11.9287 8.42815C11.7582 8.42815 11.5947 8.49588 11.4741 8.61644C11.3535 8.737 11.2858 8.90051 11.2858 9.07101V16.3567C11.2858 16.5272 11.3535 16.6907 11.4741 16.8113C11.5947 16.9319 11.7582 16.9996 11.9287 16.9996C12.0992 16.9996 12.2627 16.9319 12.3832 16.8113C12.5038 16.6907 12.5715 16.5272 12.5715 16.3567V9.07101Z"
                    fill="black"/>
            </svg>
            <input value={questionName} onChange={(e) => setQuestionName(e.target.value)}
                   placeholder={"Type Your Question"} className={"questionName nameInputs"}></input>
            <select className={"questionTypeSelect"} value={type} onChange={(e) => {
                setType(e.target.value)
            }}>
                <option value={"single_choice"}>Single choice</option>
                <option value={"multiple_choice"}>Multiple choice</option>
                <option value={"open_answer"}>Free text</option>
            </select>
            <div className={"optionsDiv"}>
                {data.map((option) => (
                    <OptionInTestCreate onDataChange={handleOptionDataChange} isLast={data.length - 1 == option.index}
                                        key={option.index} index={option.index} onRemove={() => handleRemoveElement()}
                                        type={type}/>
                ))}
            </div>
            <button onClick={() => {
                handleAddElement()
            }} className={"addOptionBtn"}>
                + Add Option
            </button>
        </div>
    );
}

export default QuestionInTestCreate;