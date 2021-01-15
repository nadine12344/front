import React,{useState} from 'react'
import MainAcademic from './Pages/Rokaya/academicMain'
import Main from './Pages/Mariam/main'

import MainHr from './Pages/Nadine/hrMain'
import ViewSchedule from './Pages/Rokaya/viewSchedule'
import Faculty from './Pages/Nadine/faculty'
import Department from './Pages/Nadine/department'
import Course from './Pages/Nadine/course'
import Location from './Pages/Nadine/location'
import Not from './Pages/Nadine/notfound'
import Staff2 from './Pages/Nadine/staff'
import Attendance from './Pages/Nadine/attendance'
import Sign from './Pages/Nadine/components/Attendance/sign'
import {useEffect} from 'react'
import ViewSlotLinkingRequests from './Pages/Rokaya/viewSlotLinkingRequests'
import ViewNotifications from './Pages/Rokaya/viewNotifications'
import ViewRecievedReplacements from './Pages/Rokaya/viewRecievedReplacemetRequest'
import ViewSentReplacements from './Pages/Rokaya/viewSentReplacementRequests'
import ViewAllRequests from './Pages/Rokaya/viewAllRequests'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'
import HODMain from './Pages/Hagar/HODMain';
import ManageCourses from './Pages/Hagar/manageCourses';
import ManageInstructors from './Pages/Hagar/manageInstructors';
import RequestsInDepartment from './Pages/Hagar/requestsInDepartment';
import StaffInDepartment from './Pages/Hagar/staffInDepartment';
import CourseInstructorMain from './Pages/Hagar/courseInstructorMain';
import ManageSlots from './Pages/Hagar/manageSlotsInstructor';
import ManageCoursesInstructor from './Pages/Hagar/manageCoursesInstructor';
import Staff from './Pages/Hagar/courseInstructorStaff';
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

import Login from './Pages/Rokaya/login'
import ChangePassword  from './Pages/Rokaya/changePassword'
import ViewProfile from './Pages/Rokaya/viewProfile'

import { useHistory } from 'react-router';


function App() {
 
  console.log("type")
  console.log(sessionStorage.getItem("type"))

  console.log("token")
  console.log(sessionStorage.getItem("token"))
  let history=useHistory()
  
//const [auth,setAuth]=useState(false)

// if(!sessionStorage.getItem("token")){
//   //setAuth(false)
//   history.push("/haker")
// }


  return (
  
    <Router>
    <React.Fragment>
    <Switch>
    <Route exact path='/sign' render={()=><Attendance/>}/>
      
    <Route exact path='/signing' render={()=><Main/>}/>
    
    <Route exact path='/updateme' render={()=><Main/>}/>
    
    <Route exact path='/myAttendance' render={()=><Main/>}/>
    
    <Route exact path='/hours' render={()=><Main/>}/>
    {  
    <Route exact path='/days' render={()=><Main/>}/>}
    {  
    <Route exact path='/salary' render={()=><Main/>}/>}
    {  
    <Route exact path='/staff' render={()=><Staff2/>}/>}
    {  
    <Route exact path='/attendance' render={()=><Attendance/>}/>}
    {  
    <Route exact path='/viewMissing' render={()=><Attendance/>}/>}
    {  
    <Route exact path='/staffAttendance' render={()=><Attendance/>}/>}
    {  
    <Route exact path='/faculty' render={()=><Faculty/>}/>}
    {  
    <Route exact path='/department' render={()=><Department/>}/>}
    {  
    <Route exact path='/course' render={()=><Course/>}/>}
    {  
    <Route exact path='/location' render={()=><Location/>}/>}
    {  
    <Route exact path='/addFaculty' render={()=><Faculty/>}/>}
    {  
    <Route exact path='/deleteFaculty' render={()=><Faculty/>}/>}
    {  
    <Route exact path='/updateFaculty' render={()=><Faculty/>}/>}
    {  
    <Route exact path='/addDepartment' render={()=><Department/>}/>}
    {  
    <Route exact path='/deleteDepartment' render={()=><Department/>}/>}
    {  
    <Route exact path='/updateDepartment' render={()=><Department/>}/>}
    { 
    <Route exact path='/addCourse' render={()=><Course/>}/>}
    {  
    <Route exact path='/deleteCourse' render={()=><Course/>}/>}
    {  
    <Route exact path='/updateCourse' render={()=><Course/>}/>}
    {  
    <Route exact path='/addLocation' render={()=><Location/>}/>}
    {  
    <Route exact path='/deleteLocation' render={()=><Location/>}/>}
    {  
    <Route exact path='/updateLocation' render={()=><Location/>}/>}
    {  
    <Route exact path='/addStaff' render={()=><Staff2/>}/>}
    {  
    <Route exact path='/deleteStaff' render={()=><Staff2/>}/>}
    {  
    <Route exact path='/updateStaff' render={()=><Staff2/>}/>}
    {  
    <Route exact path='/editSalary' render={()=><Staff2/>}/>}
    {<Route exact path='/hr' render={()=><MainHr/>}/>}
  <Route exact path='/' render={()=><Login/>}/>
    {    <Route exact path='/viewProfile' render={()=><ViewProfile/>}/>}
    
   <Route exact path='/main' render={()=><Main/>}/>
   {<Route exact path='/home' render={()=><MainAcademic/>}/>}
   <Route exact path='/viewProfile' render={()=><ViewProfile/>}/>
   {  <Route exact path='/viewSchedule' render={()=><ViewSchedule/>}/>}
  { <Route exact path='/changePassword' render={()=><ChangePassword/>}/>}
    {  <Route exact path='/viewSentReplacements' render={()=><ViewSentReplacements/>}/>}
   {  <Route exact path='/viewRecievedReplacements' render={()=><ViewRecievedReplacements/>}/>}
   {  <Route exact path='/viewAllRequests' render={()=><ViewAllRequests/>}/>}
  { <Route exact path='/viewSlotLinking' render={()=><ViewSlotLinkingRequests/>}/>}
   {  <Route exact path='/viewNotifications' render={()=><ViewNotifications/>}/>}
    <Route exact path='/HOD' render={()=><HODMain/>}/>
    <Route exact path='/HOD/manageCourses' render={()=><ManageCourses/>}/>
    <Route exact path='/HOD/manageInstructors' render={() => <ManageInstructors />} />
    <Route exact path='/HOD/requestsInDepartment' render={() => <RequestsInDepartment />} />
    <Route exact path='/HOD/staffInDepartment' render={() => <StaffInDepartment />} />
    <Route exact path='/courseInstructor' render={() => <CourseInstructorMain />} />
    <Route exact path='/courseInstructor/manageCourses' render={() => <ManageCoursesInstructor />} />
    <Route exact path='/courseInstructor/manageSlots' render={() => <ManageSlots />} />
    <Route exact path='/courseInstructor/staffInDepartment' render={()=><Staff/>}/>
 
     {<Route exact path='/haker' render={()=><Not/>}/>}
    </Switch>
     </React.Fragment>
     </Router>
   
  );
}

export default App;
