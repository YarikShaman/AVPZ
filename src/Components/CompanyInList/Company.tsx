import {useState} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Company.css"

function Company() {
    const nav = useNavigate()

    return (
        <div className='main-container'>
            <div className='wrapper'>
                <div className='box'>
                    <span className='text'>Code Crafters</span>
                    <span className='text-2'>Amount of Employees: 150 </span>
                    <span className='text-3'>Owner Name: John Smith</span>
                    <span className='text-4'>Owner Email: john.sm1th@gmail.com</span>
                    <div className='box-2'>
                        <span className='text-5'>Owner Phone Number: </span>
                        <span className='text-6'>+380 66 976 11 12</span>
                    </div>
                </div>
                <span className='text-7'>View Full Profile</span>
            </div>
        </div>
    )
}

export default Company;