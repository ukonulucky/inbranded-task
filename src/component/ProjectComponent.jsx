import React, {useEffect, useState} from 'react'
import "../styles/ProjectComponent.css"
import ProjectModel from './ProjectModel'
import { AiOutlineArrowRight } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { clear } from '@testing-library/user-event/dist/clear'

function ProjectComponent() {
    const filterState = useSelector(state => state.text)
    const [ProjectState, setProjectState] = useState([])
    const [filterData, setFilterData] = useState([])
useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("projects"))
    if (data2){
    setProjectState([...data2])
    }
  }, [])

  useEffect(() => {
    const data = filterFunc()
    setFilterData(data)
  }, [filterState, ProjectState])


  const filterFunc = () => {
   if(filterState === "") {
    return ProjectState
   }
   if(filterState){
    const data = ProjectState?.filter(i => i.ProjectName.toLowerCase().includes(filterState.toLowerCase()))
    return data
   }
  }

  const projElementsFiltered = filterData?.map((i,j) => {
    return <div key={i.id} >
    <div className="createCard">
         {i.ProjectName}
         <ProjectModel count= {i.task?.length} ProjectName={i.ProjectName} projectId = {i.id} />
    </div>
 </div>
  })

  const projElements = ProjectState?.map((i,j) => {
     return <div key={i.id} >
     <div className="createCard">
          {i.ProjectName}
          <ProjectModel count= {i.task?.length} ProjectName={i.ProjectName} projectId = {i.id} />
        
     </div>
  </div>
    
   })

  return (
    <div className='main'>
  {
    // projElementsFiltered?.length > 0 ? projElementsFiltered : projElements
   ProjectState.length > 0 ?  projElementsFiltered : <p>No Project Available</p>
  }
    </div>
  )
}

export default ProjectComponent