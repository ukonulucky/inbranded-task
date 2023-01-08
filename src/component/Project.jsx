import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Project({handleReload}) {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false)  
  const [ProjectName, setProjectName] = useState("");
  const [getProject, setGetProject] = useState([]);
  const [state,setState] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("projects"))
    if(data){
      setGetProject([...data])
    } 
      }, [submit])

  const handleSubmit = (e) => {
   e.preventDefault();
   
   if(ProjectName){
    const myProject = {
        ProjectName: ProjectName,
        checked: false,
        id:Math.random(),
        checked: false,
        task:[]
    }
    console.log(myProject)
 setState([...getProject, myProject])
   }
   setProjectName("")
   setSubmit(!submit)
   alert("Project created successfully")
  window.location.reload()
  }
  if(state.length > 0){
    localStorage.setItem("projects", JSON.stringify(state))
 }



  const handleClose = () => {
    setShow(false)
   handleReload()
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Create Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            Project Name:
            </label>
          <input
            required
            value={ProjectName}
            type="text"
            onChange={
                (e)  =>{
                    setProjectName(e.target.value);
                }
            }
            />
          </div>
            <button  className='mt-3 border-0 rounded bg-primary p-2 text-white'>
                Submit Project
            </button>
        </form>
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

export default Project