import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button'
import '../../Stylesheets/Mariam/main.css'
import Header from '../Nadine/components/Header/Header';
import Side from '../Nadine/components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'
import {Modal,ModalBody,ModalFooter,ModalHeader,Table} from 'reactstrap'
import {backendLink} from '../../keys_dev'

import Update from "../Mariam/components/update"
import Sign from "../Mariam/components/signing"
import Hours from "../Mariam/components/missinghours"
import Days from "../Mariam/components/missingdays"
import My from "../Mariam/components/myAttendance"
import Salary from "../Nadine/components/Attendance/salaryDeduction"
export default function MainAcademicPage(props) {
  const [notifications,setNotifications]=useState([])
  const [noti,setNoti]=useState(false)
  const toggle5 = () => {
    setNoti(!noti)
    setNotifications([])
    window.location.reload();
  };
  const history = useHistory()
  //const name = useSelector((state) => state.name)

  const  viewNotification=(r)=>{
    return(
        <div>
                <tr>
                    <td>
                        #
                    </td>
                    <td className="viewSentReplacementRequestTextTitle">
                           <p>Message: </p>
                    </td>
                    <td className="viewSentReplacementRequestTextData">
                             {r.message}
                    </td>
 
        </tr>
        </div>
    )
  }
 
  
  useEffect( async () => {
    setInterval(async () => {
      console.log("useeffect")
    await axios({
             url: `${backendLink}/request/getNotifications`,
             method: 'get',
             headers: {
               // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
               token:sessionStorage.getItem("token")
              },
           }).then((res) => {
             console.log(res);
             setNotifications(res.data.neww)
             console.log(res.data.neww)
             if(res.data.neww.length>0){
             setNoti(!noti)
             }
            
           }).catch((err) => {
               console.log(err.response)
             })
           
          }, 2000);
        }
           ,[])
  return (

    
    <div className="App">
       <Modal isOpen={noti} toggle={toggle5}>
           <ModalHeader toggle={toggle5}>You Hava Some New Notifications</ModalHeader>
           <ModalBody>
           <Table  striped>
           <tbody>
            {
              notifications.map((r)=>{
                  return(
                  viewNotification(r)
                  )
              })
          
            } 
              </tbody>
       </Table>        
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={toggle5}>Ok</Button>
           </ModalFooter>
         </Modal>
 
      <nav className="blue navbar  fixed-top">
      <Header name="WELCOME"/>
      
        
          <div class="col-sm-12  hideSmall">
            <div class="row">
      
            <button  class="col-sm-2 buttonblue "  onClick={()=> history.push("/signing")} ><span>sign</span></button>
            <button  class="col-sm-2 buttonblue " onClick={()=> history.push("/hours")}><span>Missing Hours</span></button>
            <button  class="col-sm-2 buttonblue " onClick={()=> history.push("/days")}><span>Missing Days</span></button>
            <button  class="col-sm-2 buttonblue " onClick={()=> history.push("/salary")}><span>Salary</span></button>
            <button  class="col-sm-2 buttonblue " onClick={()=> history.push("/updateme")}><span>Update Profile</span></button>
            <button  class="col-sm-2 buttonblue " onClick={ ()=>{if( sessionStorage.getItem("type")==="hr"){ history.push("/hr")}else{history.push("/home")}}}>

            <span> <i class="fa fa-home" aria-hidden="true">Main</i></span></button>
                  </div>  </div>
 
       
      </nav>
        
      <div className="outer2">
        <div className="inner2">
        <Switch>

<Route path="/signing" component={Sign} />
<Route path="/myAttendance" component={My} />
<Route path="/hours" component={Hours} />
<Route path="/days" component={Days} />
<Route path="/salary" component={Salary} />
<Route path="/updateme" component={Update} />
</Switch>

        </div>
      </div>
      <div class="row center2">
 
   
    <div id="class" onClick={()=> history.push("/myAttendance")}>
      <span id="blue"></span>
      <span class="text">My Attendance</span>
    </div>
    <div id="class" onClick={()=> history.push("/viewProfile")}>
      <span id="blue"></span>
      <span class="text">View Profile</span>
    </div> <div id="class" onClick={()=> history.push("/changePassword")}>
      <span id="blue"></span>
      <span class="text">Change Password</span>
    </div>
 
 
   
  
    
</div>
    </div>
  
  )
}
