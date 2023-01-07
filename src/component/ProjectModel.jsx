import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {AiOutlineArrowRight } from "react-icons/ai"
import {MdDeleteForever} from "react-icons/md"
import "../styles/ProjectModel.css"

function ProjectModel({ProjectName, projectId, count}) {
  const [show, setShow] = useState(false);
  const [state,setState] = useState([]);
  const [task,setTask] = useState(""); 
  const [error,setError] = useState(false);
  const [projectState,setProjectState] = useState([]);
  const [reload, setReload] = useState(true)


 

  useEffect(() => {
    console.log("useEffect() called")
    const data = JSON.parse(localStorage.getItem("items"))
    if(data){
      setState([...data])
    } 
    const projects = JSON.parse(localStorage.getItem("projects"))
    if(projects){
      setProjectState([...projects])
    } 
      }, [reload])


 const handleForm = (e) => {
  e.preventDefault()
   if(task === ""){
    setError(true)
    return
   }else{
    setError(false)
   }
   // geting all projects fro DB
   const projects = JSON.parse(localStorage.getItem("projects"))
   //getting a single project from Db by using its index 
         const Id = projects.findIndex(i => i.id === projectId)
         const myProject = projects.slice(Id, Id + 1)
        // checking if the task already exist in the project
         console.log('THIS IS the task', task) 
            
 //getting a single task from Db by using its index 
       const taskObject= state?.find(i => i.id === JSON.parse(task))
     const allreadyExistedTask =  myProject[0].task.find(i => i.id === taskObject.id)
     if(allreadyExistedTask) {
      alert("task already exists in project")
      return 
     }
         myProject[0].task = [...myProject[0].task, taskObject]
      projects.splice(Id, 1, {...myProject[0]})
     localStorage.setItem("projects", JSON.stringify(projects))
     setReload(!reload)
 }



  const handleClose = () => {
    setShow(false)
    window.location.reload()
  };
  const handleShow = () => setShow(true);
  const elementToShow = projectState?.find((i) => {
  return i.id === projectId
  })

 const dropDownOptions = state?.map((i,j) => {

  if(elementToShow.task?.id && i.task?.id !== elementToShow.task?.id ){
    return   <option key={j} value={ i.id }>{i.taskHeading}</option>
 } else{
  return   <option key={j} value={ i.id }>{i.taskHeading}</option>
 }
 })
   
 const taskList = projectState?.filter(i => i.id === projectId)
 
 
 const handleDelete = (Id) => {
  const item = JSON.parse(localStorage.getItem("projects"))
const modifiedData =  item.filter((i) => {
       return i.id === projectId
  })
  const taskClicked = modifiedData[0]?.task.filter( i => i.id !== Id)
  console.log(taskClicked)
  modifiedData[0].task = taskClicked
  const updatedData = modifiedData[0]
  item.splice(projectId, 1, updatedData)

  localStorage.setItem("projects", JSON.stringify(item))

  // window.location.reload()
//     window.location.reload()
setReload(!reload)
alert("task deleted successfully")

 }

 const taskElement = taskList[0]?.task.map((i,j) => {
    return <div key={i.id}>
    <div className="content" style={{
        display: "flex"
    }}>
    <li> <span>Task Heading:   {i.taskHeading}</span>
     <h6>Task Content:   {i.taskContent}</h6>
     </li>
    </div>
  <span onClick= {() => {
    handleDelete(i.id)
  }} style={{
    cursor:"pointer"
  }}>
  <MdDeleteForever />
  </span>
    </div>
 })

  return (
    <>
      <span style={
        {
            cursor: "pointer",
            fontSize: "15px",
             display: 'flex',
            alignItems: 'center',
             justifyContent: 'space-between',
            fontSize:"12px",
            fontWeight:"lighter",
        }
      } variant="secondary" onClick={handleShow}>
     They are {count} task available <AiOutlineArrowRight />
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{ProjectName} -- Add Task To Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <h3>List Of Task</h3>
         {
            taskElement?.length > 0 ? <ol>
                {taskElement}
            </ol> : "No tasks available"
         }

        <Form onSubmit={handleForm}>
        <Form.Select
        onChange={(e) => {
            setTask(e.target.value)
        }}
        aria-label="Default select example">
      <option value="">Add Task</option>
     {dropDownOptions}
    
    </Form.Select>
    <button className='mt-3 border-0 rounded bg-primary p-2 text-white '>
        Add To Task
     </button>
            </Form>
          {
            error ?  <p className='text-danger'>
            task field can not be empty
           </p>:""
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectModel