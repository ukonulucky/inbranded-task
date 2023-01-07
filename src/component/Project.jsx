import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Project() {
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
        task:[]
    }
    console.log(myProject)
 setState([...getProject, myProject])
   }
   setProjectName("")
   setSubmit(!submit)
  }
  if(state.length > 0){
    localStorage.setItem("projects", JSON.stringify(state))
 }
 console.log(ProjectName)


  const handleClose = () => {
    setShow(false)
    window.location.reload()
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
            <button className='mt-3'>
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