interface UserData {
    email: string
    name: string
    phone_number: string
    id: number
    registered_at: string
    average_score: number
    tags: Tag[]
    companies: Company[]
}

interface Tag {
    id: number
    title: string
}

interface Company {
    id: number
    title: string
    name: string
    role: string
}
export default UserData;