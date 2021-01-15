import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Stylesheets/Hagar/HOD.css';
import { Button, Form,Table } from 'react-bootstrap';
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useState, useEffect } from 'react';
import logo from '../../Images/GUC.png'
import { useHistory } from 'react-router'
export default function ManageCourses(props) {
    const [courseCoverage, setCourseCoverage] = useState([]);
    const [slots, setSlots] = useState([]);
    const [courseName, setCourseName] = useState('');
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
    useEffect(() => {
        async function fetchMyData() {
            await getCoverage();
           
        }
        fetchMyData();
     },[])
    async function getCoverage() {
        await axios({
            url: `${backendLink}/HOD/courseCoverage`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            console.log("getcourse coverage")
            console.log(res.data)
            if (!res.data.error) {
                setCourseCoverage(res.data);
            }
          
           // console.log(res.data);
            
           
        }).catch((err) => {
     
            console.log(err.response);
        })
    }

    
    async function getSlots() {
        await axios({
            url: `${backendLink}/HOD/teachingAssignmentsOfCourse`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                courseName: courseName
            }
        }).then((res) => {
           if(!res.data.error)
            setSlots(res.data);
           
        }).catch((err) => {
      
            console.log(err.response)
        })
    }
    
    return (
        <div className="main-container">
             <i className="fa fa-sign-out fa-lg sign-out-logo" onClick={logoutClick}></i>
            <h2>Courses Coverage</h2>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Course</th>
            <th>Coverage</th>
           
            </tr>
        </thead>
        <tbody>
            {
                courseCoverage.map((c, i) => {
                    return (
                        <tr key={i+1}>
                        <td>{i+1}</td>
                        <td>{c.Course}</td>
                        <td>{c.Coverage}</td>
                        </tr>
                    );
                })
            }  
           
        </tbody>
            </Table>
            <h2>Slots Assignments</h2>
            <Form>
          
          <Form.Group >
            <Form.Label>Course name</Form.Label>
            <Form.Control onChange={(event)=>setCourseName(event.target.value)} placeholder="Enter course name" />
        </Form.Group>                
        </Form>
                
          <Button variant="primary" onClick={getSlots} >
                Show Assignments
          </Button>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Member</th>
            <th>Order</th>
            <th>Day</th>
            <th>Course</th>
            <th>Location</th>
            </tr>
        </thead>
        <tbody>
            {
                slots.map((c, i) => {
                    return (
                        <tr key={i+1}>
                        <td>{i+1}</td>
                        <td>{c.academicMember}</td>
                        <td>{c.order}</td>
                        <td>{c.day}</td>
                        <td>{c.course}</td>
                        <td>{c.location}</td>
                        </tr>
                    );
                })
            }  
           
        </tbody>
    </Table>
        </div>
    );

}