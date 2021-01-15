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
export default function RequestsInDepartment(props) {
    const [daysOff, setDaysOff] = useState([]);
    const [requests, setRequests] = useState([]);
    const [alertResponse, setAlertResponse] = useState([]);
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
    let r = [];
    useEffect(() => {
        getDaysOff();
        getRequests();
    }
        , []);
    async function getDaysOff() {
        await axios({
            url: `${backendLink}/HOD/viewDaysOffInDepartment`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            if (!res.data.error) {
                setDaysOff(res.data);
            }
            
           
        }).catch((err) => {
     
            console.log(err.response)
        })
    }
    async function getRequests() {
        await axios({
            url: `${backendLink}/HOD/viewChangeDayOffRequests`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            if (!res.data.error) {
                r = res.data;
            }
            
           
        }).catch((err) => {
     
            console.log(err.response)
        });
        await axios({
            url: `${backendLink}/HOD/viewLeaveRequests`,
            method: 'get',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {}
        }).then((res) => {
            if (!res.data.error) {
                r = [...r, ...res.data];
                setRequests(r);
            }
           
        }).catch((err) => {
     
            console.log(err.response)
        })
    }
    async function acceptRequest(key) {
        await axios({
            url: `${backendLink}/HOD/acceptRequest`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                _id:requests[key]._id
            }
        }).then((res) => {
            if (!res.data.error) {
                setAlertResponse(JSON.stringify(res.data));
            }
           
        }).catch((err) => {
     
            console.log(err.response)
        });
    }
    async function rejectRequest(key) {
        await axios({
            url: `${backendLink}/HOD/rejectRequest`,
            method: 'post',
            headers: {
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                token:sessionStorage.getItem("token")
               },
            data: {
                _id:requests[key]._id
            }
        }).then((res) => {
            if (!res.data.error) {
                setAlertResponse(JSON.stringify(res.data));
            }
           
        }).catch((err) => {
     
            console.log(err.response)
        }); 
    }
    return (
        <div className='main-container'>
             <i className="fa fa-sign-out fa-lg sign-out-logo" onClick={logoutClick}></i>
            <h2>Days OFF In Department</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>ID</th>
                <th>Day OFF</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    daysOff.map((c, i) => {
                        return (
                            <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{c.academicMember}</td>
                            <td>{c.dayOff}</td>
                            </tr>
                        );
                    })
                }  
            
            </tbody>
            </Table>
            <h2>Requests In Department</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date of Request</th>
                <th>Documents In Drive Link</th>
                <th>Accept Request</th>
                <th>Reject Request</th>
                </tr>
            </thead>
            <tbody>
                {
                    requests.map((c, i) => {
                        return (
                            <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{c.from}</td>
                            <td>{c.to}</td>
                            <td>{c.type}</td>
                            <td>{c.reason}</td>
                            <td>{c.status}</td>
                            <td>{c.dateOfRequest}</td>
                            <td>{c.documentsDriveLink}</td>
                            <td> <Button variant="primary" onClick={()=>{acceptRequest(i)}} >
                                   Accept
                                </Button>
                            </td>
                            <td> <Button variant="primary" onClick={()=>{rejectRequest(i)}} >
                                   Reject
                                </Button>
                            </td>
                            </tr>
                        );
                    })
                }  
            
            </tbody>
            </Table>
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