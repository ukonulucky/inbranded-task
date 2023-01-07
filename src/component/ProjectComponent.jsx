import React, {useEffect, useState} from 'react'
import "../styles/ProjectComponent.css"
import ProjectModel from './ProjectModel'
import { AiOutlineArrowRight } from "react-icons/ai"


function ProjectComponent() {

    const [ProjectState, setProjectState] = useState([])
    const [taskNumber, setTaskNumber] = useState(0)
useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("projects"))
    if (data2){
    setProjectState([...data2])
    }
  }, [])
  const projElements = ProjectState.map((i,j) => {
    return <div key={i.id} >
       <div className="createCard">
            {i.ProjectName}
            <ProjectModel count= {i.task?.length} ProjectName={i.ProjectName} projectId = {i.id} />
          
       </div>
    </div>
  })

  return (
    <div className='main'>
  {projElements}
    </div>
  )
}

export default ProjectComponent