import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Stylesheets/Hagar/HOD.css';
import { Button, Form } from 'react-bootstrap';
import { Alert } from 'reactstrap';
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useState } from 'react';
import logo from '../../Images/GUC.png'
import { useHistory } from 'react-router'
export default function ManageCoursesInstructor(props) {
    const [instructorID, setInstructorID] = useState('');
    const [courseName, setCourseName] = useState('');
    const [show, setShow] = useState(true);
  const [alertResponse, setAlertResponse] = useState('');
  const history = useHistory()
    const logoutClick= async ()=>{
      sessionStorage.removeItem("token")
        await axios({
          url: `${backendLink}/logging/logout`,
          method: 'post',
        }).then((res) => {
            console.log(res)
            
        }).catch((err) => {
            console.log(err.response)
          })
        history.push("/")
      }
    async function addAcademicToCourse() {
        await axios({
          url: `${backendLink}/courseInstructor/assignAcademicToCourse`,
          method: 'post',
          headers: {
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            token:sessionStorage.getItem("token")
           },
          data: {
            academicID: instructorID,
            courseName:courseName
              },
         
        }).then((res) => {
          if (!res.data.error) {
            setAlertResponse(JSON.stringify(res.data));
            console.log(alertResponse);
          }
            setShow(true);
            
        }).catch((err) => {
          
            console.log(err.response)
          })
      }
      async function removeAcademicFromCourse() {
        await axios({
          url: `${backendLink}/courseInstructor/removeAcademicFromCourse`,
          method: 'post',
          headers: {
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            token:sessionStorage.getItem("token")
           },
          data: {
            academicID: instructorID,
            courseName:courseName
              },
         
        }).then((res) => {
          if (!res.data.error) {
            setAlertResponse(JSON.stringify(res.data));
            console.log(alertResponse);
          }
          setShow(true);
        }).catch((err) => {
          
            console.log(err.response)
          })
      }
    async function makeCoordinator() {
        await axios({
            url: `${backendLink}/courseInstructor/makeCoordinator`,
            method: 'post',
            headers: {
              // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
              token:sessionStorage.getItem("token")
             },
            data: {
              academicID: instructorID,
              courseName:courseName
                },
           
          }).then((res) => {
            if (!res.data.error) {
              setAlertResponse(JSON.stringify(res.data));
              console.log(alertResponse);
            }
            setShow(true);
          }).catch((err) => {
            
              console.log(err.response)
            })
    }
    return (
      <div className="main-container">
           <i className="fa fa-sign-out fa-lg sign-out-logo" onClick={logoutClick}></i>
        <Form>
        
  <Form.Group >
    <Form.Label>Course name</Form.Label>
    <Form.Control onChange={(event)=>setCourseName(event.target.value)} placeholder="Enter course name" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Academic ID</Form.Label>
    <Form.Control onChange={(event)=>setInstructorID(event.target.value)} placeholder="Enter academic id" />
          </Form.Group>
        
        </Form>
        <Button variant="primary" onClick={addAcademicToCourse}>
        Assign Academic to Course
  </Button>
  <Button variant="primary" onClick={removeAcademicFromCourse} >
                Remove Academic from Course
  </Button>
  <Button variant="primary" onClick={makeCoordinator} >
         Make Academic Coordinator for Course
  </Button>
  <Alert color="info" fade={false}>
      <h4 className="alert-heading">Response</h4>
      <p>
        {alertResponse}
      </p>
      <hr />
      {/* <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
      </p> */}
    </Alert>
        </div>
    );
}