import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Stylesheets/Hagar/HOD.css';
import { Button, Form,Table } from 'react-bootstrap';
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useState, useEffect } from 'react';
import logo from '../../Images/GUC.png'
import { useHistory } from 'react-router'
export default function StaffInDepartment(props) {
    const [courseName, setCourseName] = useState('');
    const [academicsDep, setAcademicsDep] = useState([]);
    const [academicsCourse, setAcademicsCourse] = useState([]);
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
            await getAcademicsInDep();
           
        }
        fetchMyData();
     },[])
    async function getAcademicsInDep() {
        await axios({
            url: `${backendLink}/HOD/viewStaffByDepartment`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            if (!res.data.error)
            setAcademicsDep(res.data);
            
           
        }).catch((err) => {
     
            console.log(err.response)
        })
    }
    async function getAcademicsInCourse() {
        await axios({
            url: `${backendLink}/HOD/viewStaffByCourseName`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                courseName:courseName
            }
        }).then((res) => {
            if (!res.data.error)
            setAcademicsCourse(res.data);
            
           
        }).catch((err) => {
     
            console.log(err.response)
        })
    }
    return (
        <div className="main-container">
             <i className="fa fa-sign-out fa-lg sign-out-logo" onClick={logoutClick}></i>
            <h2>Staff In Department</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Courses</th>
                <th>Instructor For</th>
                <th>Coordinator For</th>
                </tr>
            </thead>
            <tbody>
                {
                    academicsDep.map((c, i) => {
                        return (
                            <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{c.id}</td>
                            <td>{c.email}</td>
                            <td>{c.name}</td>
                            <td>{c.courses}</td>
                            <td>{c.instructorFor}</td>
                            <td>{c.coordinatorFor}</td>
                            </tr>
                        );
                    })
                }  
            
            </tbody>
            </Table>
            <h2>Search Staff By Course</h2>
            <Form>
          
          <Form.Group >
            <Form.Label>Course name</Form.Label>
            <Form.Control onChange={(event)=>setCourseName(event.target.value)} placeholder="Enter course name" />
        </Form.Group>                
        </Form>
                
          <Button variant="primary" onClick={getAcademicsInCourse} >
                Show Academics
          </Button>
          <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Courses</th>
                <th>Instructor For</th>
                <th>Coordinator For</th>
                </tr>
            </thead>
            <tbody>
                {
                    academicsCourse.map((c, i) => {
                        return (
                            <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{c.id}</td>
                            <td>{c.email}</td>
                            <td>{c.name}</td>
                            <td>{c.courses}</td>
                            <td>{c.instructorFor}</td>
                            <td>{c.coordinatorFor}</td>
                            </tr>
                        );
                    })
                }  
            
            </tbody>
            </Table>
            
        </div>
    );

    
}