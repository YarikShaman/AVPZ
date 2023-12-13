export interface Test {
    title: string,
    description: string,
    completion_time: number,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    company_id: number,
    questions:Question[],
    "tags": [
        {
            "id": number,
            "title": string
        }
    ]
}

export interface Question {
    title: string,
    type: string,
    id: number,
    quiz_id: number,
    answers: Answer[]
}
export interface Answer{
    title: string,
    is_correct: boolean,
    question_id: number
}