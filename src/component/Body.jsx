import React, {useState, useEffect} from 'react'
import "../styles/home.css"
import Task from './Task'
import {MdDeleteForever} from "react-icons/md"
import {AiOutlineArrowRight} from "react-icons/ai"
import Project from './Project'
import ProjectComponent from './ProjectComponent'
import {GrFormAdd} from "react-icons/gr"

function Body({filterState}) {
const [state, setState] = useState([])
const [projectState, setProjectState] = useState([])
const [reload, setReload] = useState(false)



useEffect(() => {
  const data = JSON.parse(localStorage.getItem("items"))
  if (data){
  setState([...data])
  }
  const data2 = JSON.parse(localStorage.getItem("projects"))
  if (data2){
  setProjectState([...data2])
  }
}, [reload])

const handleReload = () => {
    setReload(!reload)
}
const handleCheck = (id) => {
  const elements = JSON.parse(localStorage.getItem("items"))
 const index = elements.findIndex((i) => {
    return i.id === id
 })
const newData = elements.slice(index,index + 1)
const element = newData[0]
console.log(element)
element.checked = !element.checked
 elements.splice(index,1,element)

localStorage.setItem("items",JSON.stringify(elements))
setReload(!reload)
}

const deleteItem = (id) => {
    console.log("code running")
    const item = JSON.parse(localStorage.getItem("items"))
  const modifiedData =  item.filter((i) => {
       return i.id !== id
    })
    localStorage.setItem("items", JSON.stringify(modifiedData))
    setReload(!reload)
}
const items = state.map((i,j) => {
    return <div className="text" key={j}>
          <input type="checkbox" checked = {
            i.checked ? true : false
          } 
          onChange= {
            () => {
                handleCheck(i.id)
            }
          }
          className='rounded' />
          <span className='heading'>{i.taskHeading}</span>
          <span className='content'>{i.taskContent}</span>
          <span className='click' onClick={
            () => {
            deleteItem(i.id)
            }
          }>
          <MdDeleteForever />
          </span>
    </div>
})
const projectElement = projectState.map((i,j) => {
    return <div className="text" key={j}>
          <input type="checkbox" checked = {
            i.checked ? true : false
          } 
          onChange= {
            () => {
                handleCheck(i.id)
            }
          }
          className='rounded' />
          <span className='heading'>{i.ProjectName}</span>
    </div>
})

  return (
   <div className="wrapper">
     <div className='wrapper-first'>
     <div className="d-flex justify-content-between align-items-center pe-3 ps-3">
     <h3>Projects <GrFormAdd  className='plus'/></h3>
     <span className='d-flex align-items-center gx-3'>
        All Projects 
       <AiOutlineArrowRight />
     </span>
     </div>
     <ProjectComponent filterState={filterState} />
     </div>
    <div className='wrapper-center'>
       <div className="top mt-3">
        <h3>All Task For Today</h3>
      <div className="new">
        <Task handleReload={handleReload}  />
      </div>
       </div>
       <div className="wrapper-body">
     {
        items.length > 0 ? items : <div> They are zero task present  </div>
     }
     <div className='mt-5'>
        <div className="wrapper d-flex justify-content-between align-items-center">
        <h3>Projects</h3>
        <Project handleReload={handleReload} />
        </div>
        <div>
        {
        projectState.length > 0 ? projectElement : <div> They are zero Projects present  </div>
     }
        </div>
        
     </div>
       </div>
    </div>
    <div className="wrapper-last">
        calender
    </div>
   </div>
  )
}

export default Body