export type ListOfTest = Test[]

export interface Test {
    id: number
    title: string
    start_time: string
    start_date: string
    end_time: string
    end_date: string
    tags: Tag[]
}

export interface Tag {
    id: number
    title: string
}