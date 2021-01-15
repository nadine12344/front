import React from 'react'
import Button from 'react-bootstrap/Button'
import '../../Stylesheets/Nadine/main.css'
import Header from './components/Header/Header';
import Side from './components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router'
import logo from '../../Images/GUC.png'
import axios from 'axios'

import {backendLink} from '../../keys_dev'



export default function MainAcademicPage(props) {
  const history = useHistory()
  //const name = useSelector((state) => state.name)
  
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

  return (
    <div class="main">
    <div class="purple">
    <Header name="WELCOME"/>
    
    <Side content={ <div>
      <Button onClick={()=> history.push("/addFaculty")} variant="light" size="lg" block >
    Add faculty
  </Button> <Button onClick={()=> history.push("/deleteFaculty")}variant="light" size="lg"  block >
  Delete faculty
  </Button> <Button onClick={()=> history.push("/updateFaculty")}variant="light" size="lg" block>
  update faculty
  </Button>
  <Button onClick={()=> history.push("/addDepartment")}variant="light" size="lg" block>
   Add department
  </Button><Button onClick={()=> history.push("/updateDepartment")} variant="light" size="lg" block>
   Update department
  </Button><Button onClick={()=> history.push("/deleteDepartment")} variant="light" size="lg" block>
   Delete department
  </Button>
  <Button variant="light"onClick={()=> history.push("/addCourse")} size="lg" block>
   Add course
  </Button><Button onClick={()=> history.push("/updateCourse")} variant="light" size="lg" block>
   Update course
  </Button><Button onClick={()=> history.push("/deleteCourse")}variant="light" size="lg" block>
   Delete course
  </Button></div>}/>
 
    <div class="col-sm-12  ">
    <i className="fa offset-9 bottom pointer fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}>Logout</i>
            <div class="row">
      
            <button  class="col-sm-2 button "  onClick={()=> history.push("/home")} onClick={()=> history.push("/addStaff")}><span>Add a new staff</span></button>
            <button  class="col-sm-2 button " onClick={()=> history.push("/updateStaff")}><span>Update a staff</span></button>
            <button  class="col-sm-2 button " onClick={()=> history.push("/deleteStaff")}><span>Delete a staff</span></button>
            <button  class="col-sm-2 button" onClick={()=> history.push("/editSalary")}><span>Edit staff's salary</span></button>
            <button class=" col-sm-2 button" onClick={()=> history.push("/sign")}> <span>Add a missing sign in/sign out</span></button>
            <button  class=" col-sm-2 button " onClick={()=> history.push("/staffAttendance")}> <span>View attendance</span></button>
                  </div>  </div>
                
         
</div>
 <div class="row center2">

 <div id="class">
      <span id="id"></span>
      <span class="text" onClick={()=> history.push("/main")}> <i class="fa fa-home" aria-hidden="true">home</i></span>
    </div>
    <div id="class">
      <span id="id"></span>
      <span class="text" onClick={()=> history.push("/viewMissing")}>View staff members with missing hours/days</span>
    </div>
    <div id="class" onClick={()=> history.push("/addLocation")}>
      <span id="id"></span>
      <span class="text" >Add Location</span>
    </div>
    <div id="class" onClick={()=> history.push("/updateLocation")}>
      <span id="id"></span>
      <span class="text" >update Location</span>
    </div>
    <div id="class" onClick={()=> history.push("/deleteLocation")}>
      <span id="id"></span>
      <span class="text">Delete Location</span>
    </div>
    
</div></div>
  )
}
