import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Task({handleReload}) {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false)
  
  const [taskHeading, setTaskHeading] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [getTask, setGetTask] = useState([]);
  const [state,setState] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"))
    if(data){
        console.log("data info",data)
      setGetTask([...data])
    } 
      }, [submit])

  const handleSubmit = (e) => {
   e.preventDefault();
   
   if(taskHeading && taskContent){
    const myTask = {
        taskHeading: taskHeading,
        taskContent:taskContent,
        checked: false,
        id:Math.random()
    }
 setState([...getTask, myTask])
   }
   setTaskContent("")
   setTaskHeading("")
   setSubmit(!submit)
   alert("task created successfully")
   window.location.reload()
  }
  if(state.length > 0){
    localStorage.setItem("items", JSON.stringify(state))
 }
 


  const handleClose = () => {
    setShow(false)
    handleReload()
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Add task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
                Heading:
            </label>
          <input
            required
            value={taskHeading}
            type="text"
            onChange={
                (e)  =>{
                    setTaskHeading(e.target.value);
                }
            }
            />
          </div>
          <div>
            <label>
                Content:
            </label>
          <input
            required
            value={taskContent}
            type="text"
            onChange={
                (e)  =>{
                    setTaskContent(e.target.value);
                }
            }
            />
          </div>
         
            <button  className="mt-3 border-0 rounded bg-primary p-2 text-white" >
                Submit Task
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

export default Task