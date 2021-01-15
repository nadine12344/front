import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Stylesheets/Hagar/HOD.css';
import { Button, Form, Table } from 'react-bootstrap';
import { Alert } from 'reactstrap';
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useState, useEffect } from 'react';
import logo from '../../Images/GUC.png'
import { useHistory } from 'react-router'
export default function ManageSlots(props) {
    const [courseCoverage, setCourseCoverage] = useState([]);
    const [slots, setSlots] = useState([]);
    const [courseName, setCourseName] = useState(''); 
    const [slotId, setSlotId] = useState('');
    const [updated, setUpdated] = useState(true);
    const [academic, setAcademic] = useState('');
    const [academic2, setAcademic2] = useState('');
    const [alertResponse, setAlertResponse] = useState('');
    const [alertResponse2, setAlertResponse2] = useState('');
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
            await getSlots();
           
        }
        fetchMyData();
     },[updated])
    async function getCoverage() {
        await axios({
            url: `${backendLink}/courseInstructor/courseCoverage`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            if (!res.data.error) {
                setCourseCoverage(res.data);
            }
           
        }).catch((err) => {
     
            console.log(err.response)
        })
    }

    
    async function getSlots() {
        await axios({
            url: `${backendLink}/courseInstructor/slotsAssignment`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
           if(!res.data.error)
            setSlots(res.data);
           
        }).catch((err) => {
      
            console.log(err.response)
        })
    }
    async function assignSlotToMember() {
        await axios({
            url: `${backendLink}/courseInstructor/assignSlotToMember`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                academicID: academic,
                _id:slotId
            }
        }).then(async (res) => {
            setAlertResponse(JSON.stringify(res.data));
            if (!res.data.error) {
               
                await getSlots();
                await getCoverage();
            }
           
        }).catch((err) => {
      
            console.log(err.response)
        })
    }
    async function deleteSlotAssignmentFromMember() {
        await axios({
            url: `${backendLink}/courseInstructor/deleteSlotAssignmentFromMember`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                academicID: academic,
                _id:slotId
            }
        }).then(async (res) => {
            setAlertResponse(JSON.stringify(res.data));
            if (!res.data.error) {
                
                await getSlots();
                await getCoverage();
            }
           
        }).catch((err) => {
      
            console.log(err.response)
        })
    }
    async function updateSlotAssignmentToMember() {
        await axios({
            url: `${backendLink}/courseInstructor/updateSlotAssignmentToMember`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                academicID: academic2,
                _id: slotId,
                courseName:courseName
            }
        }).then(async (res) => {
            setAlertResponse2(JSON.stringify(res.data));
            if (!res.data.error) {
                
                await getSlots();
                await getCoverage();
            }
           
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
            
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Member</th>
            <th>Order</th>
            <th>Day</th>
            <th>Course</th>
            <th>Location</th>
            <th>Select</th>
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
                        <td>  <Button variant="primary" onClick={()=>{setSlotId(slots[i]._id)}} >
                                Choose Slot
                              </Button>
                        </td>
                        </tr>
                    );
                })
            }  
           
        </tbody>
            </Table>
            <h2>Manage Slots Assignments</h2>
            <Form>
          
          
          <Form.Group >
            <Form.Label>Academic ID</Form.Label>
            <Form.Control onChange={(event)=>setAcademic(event.target.value)} placeholder="Enter academic id" />
                  </Form.Group>
                
                </Form>
                <Button variant="primary" onClick={assignSlotToMember}>
                  Assign SELECTED Slot to Member
          </Button>
          <Button variant="primary" onClick={deleteSlotAssignmentFromMember} >
                  Remove SELECTED Slot from Member
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
            <h2>Update Slot Assignment</h2>
            <Form>
          
          
        <Form.Group >
            <Form.Label>New Course name</Form.Label>
            <Form.Control onChange={(event)=>setCourseName(event.target.value)} placeholder="Enter new course name" />
          </Form.Group>
          <Form.Group >
            <Form.Label>Academic ID</Form.Label>
            <Form.Control onChange={(event)=>setAcademic2(event.target.value)} placeholder="Enter Academic id" />
           </Form.Group>
                
                </Form>
                
          <Button variant="primary" onClick={updateSlotAssignmentToMember} >
                  Update Slot
          </Button>
          <Alert color="info" fade={false}>
              <h4 className="alert-heading">Response</h4>
              <p>
                {alertResponse2}
              </p>
              <hr />
              {/* <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
              </p> */}
            </Alert>
        </div>
    );

}