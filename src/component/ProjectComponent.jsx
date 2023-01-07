import React, {useEffect, useState} from 'react'
import "../styles/ProjectComponent.css"
import ProjectModel from './ProjectModel'
import { AiOutlineArrowRight } from "react-icons/ai"


function ProjectComponent({filterState}) {

    const [ProjectState, setProjectState] = useState([])
    const [taskNumber, setTaskNumber] = useState(0)
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
  }, [  filterState])
  console.log('this is the filtered project', filterState)
  const filterFunc = () => {
    console.log("code just ran")
    let data

    if(filterState){
    data = ProjectState?.filter((i) =>{
            if(i.ProjectName.includes(filterState)){
                return i
            }
        })
       }
       return data
  }

  const projElementsFiltered = filterData?.map((i,j) => {
   if(i.ProjectName.includes(filterState)){
    return <div key={i.id} >
    <div className="createCard">
         {i.ProjectName}
         <ProjectModel count= {i.task?.length} ProjectName={i.ProjectName} projectId = {i.id} />
       
    </div>
 </div>
   }
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
    projElementsFiltered?.length > 0 ? projElementsFiltered : projElements
  }
    </div>
  )
}

export default ProjectComponent