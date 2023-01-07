import React from 'react'
import "../styles/header.css"
import {BsSearch, BsPersonFill } from "react-icons/bs"
import {AiOutlineBell} from "react-icons/ai"
import {GrFormAdd} from "react-icons/gr"

function Header() {
  return (
   <div className="header border border-bottom-success">
    <div className="headerFirst">
        <h2>CMP</h2>
        <div className="search">
            <BsSearch color='white'  />
            <input type="text"
             placeholder='Search Process Or Tags' />
        </div>
    </div>
    <div className="headerCenter">
        <span>Projects and tags</span>
        <span>
            members
        </span>
        <span>
            performance
        </span>
        <span>profile</span>
    </div>
    <div className="headerEnd"
    >
        <span className='d-flex align-items-center'>invite people
            <GrFormAdd />
        </span>
       
        <AiOutlineBell />
        <BsPersonFill />
    </div>
   </div>
  )
}

export default Header