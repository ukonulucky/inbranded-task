import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function ProjectModel({ProjectName, projectId}) {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false)
  const [state,setState] = useState([]);
  const [task,setTask] = useState("");
  const [error,setError] = useState(false);
  const [projectState,setProjectState] = useState([]);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"))
    if(data){
      setState([...data])
    } 
    const projects = JSON.parse(localStorage.getItem("projects"))
    if(projects){
      setProjectState([...projects])
    } 
      }, [])


 const handleForm = (e) => {
  e.preventDefault()
   if(task === ""){
    setError(true)
    return
   }else{
    setError(false)
   }
  
         const Id = projectState.findIndex(i => i.id === projectId)
         const myProject = projectState.slice(Id, Id + 1)
       const taskObject= state?.find(i => i.id === JSON.parse(task))
         myProject[0].task = [...myProject[0].task, taskObject]
       console.log("this is my project2", myProject)
      projectState.splice(Id, 1, {...myProject})
       console.log(projectState)
    localStorage.setItem("items", JSON.stringify(projectState))
    
 }


  const handleClose = () => {
    setShow(false)
    window.location.reload()
  };
  const handleShow = () => setShow(true);
 const dropDownOptions = state?.map((i,j) => 
   {
   
    return   <option key={i.id} value={ i.id }>{i.taskHeading}</option>
   }
 )
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Add Task
      </Button>

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