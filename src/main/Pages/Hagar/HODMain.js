import React from 'react'
import logo from '../../Images/GUC.png'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/ViewSchedule.css'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/viewSentReplacementRequests.css'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router'




export default function HODMain(props) {
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
  const manageInstructors=()=>{
    history.push("/HOD/manageInstructors")
  }

  const manageCourses=()=>{
    history.push("/HOD/manageCourses")
  }

  const requestsInDepartment=()=>{
    history.push("/HOD/requestsInDepartment")
  }
    const staffInDepartment = () => {
        history.push("/HOD/staffInDepartment")
    }


  return (
  <Table>
    <tbody className="MainAcademicTable">
      <td className="MainAcademicTableColumn1">
        <tr className="MainAcademicList">
        <tr >
          <p className="MainAcademicListFont" onClick={manageInstructors}>Manage Instructors</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={manageCourses}>Manage Courses</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={requestsInDepartment}>Manage Requests In Department</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={staffInDepartment}>Manage Staff In Department</p>
        </tr>
    
        </tr>
       
      </td>

      <td className="MainAcademicTableColumn2">
        <tr>
        <img className="MainAcademicLogo" src={logo} alt="Logo" />
            <i className="fa fa-sign-out fa-lg sign-out-logo" onClick={logoutClick}></i>
        </tr>
     </td>

     </tbody>
    </Table>

  )
}
