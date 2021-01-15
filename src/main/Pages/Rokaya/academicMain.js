import React, { useState,useEffect } from 'react'
import logo from '../../Images/GUC.png'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router'
import SendReplacementRequest from '../../Components/Rokaya/sendReplacementModal'
import SendSlotLinking from '../../Components/Rokaya/sendSlotLinkingModal'
import SendChangeDayOffRequest from '../../Components/Rokaya/sendChangeDayOff'
import SendMetrinityLeave from '../../Components/Rokaya/sendMetrinityLeaveModal'
import SendSickLeave from '../../Components/Rokaya/sendSickLeave'
import SendCompensationLeave from '../../Components/Rokaya/sendCompensationLeaveModal'
import SendAccidentalLeave from '../../Components/Rokaya/sendAccidentalLeaveModal'
import SendAnnualLeave from '../../Components/Rokaya/sendAnnualLeaveModal'
import AddSlot from '../../Components/Rokaya/addSlotModal'
import UpdateSlot from '../../Components/Rokaya/updateSlotModal'
import DeleteSlot from '../../Components/Rokaya/deleteSlotModal'
import {backendLink} from '../../keys_dev'
import axios from 'axios'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'



export default function MainAcademicPage(props) {
  const [sendReplacement,setSendReplacement]=useState(false)
  const [sendSlot,setSendSlot]=useState(false)
  const [sendDayyOff,setSendDayOff]=useState(false)
  const [sendMetrinity,setSendMetrinity]=useState(false)
  const [sendAccidental,setSendAccidental]=useState(false)
  const [sendSick,setSendSick]=useState(false)
  const [sendAnnual,setSendAnnual]=useState(false)
  const [sendCompensation,setSendCompensation]=useState(false)
  const [addSlot,setAddSlot]=useState(false)
  const [updateSlot,setUpdateSlot]=useState(false)
  const [deleteSlot,setDeleteSlot]=useState(false)
  const [notifications,setNotifications]=useState([])
  const [noti,setNoti]=useState(false)
  const toggle5 = () => {
    setNoti(!noti)
    setNotifications([])
    window.location.reload();
  };
  const history = useHistory()
  const viewScheduleClick=()=>{
    history.push("/viewSchedule")
  }

  const viewSentReplacmentsClick=()=>{
    history.push("/viewSentReplacements")
  }

  const viewRecievedReplacmentsClick=()=>{
    history.push("/viewRecievedReplacements")
  }
  const HODClick=()=>{
    history.push("/HOD")
  }
  const InstructorClick=()=>{
    history.push("/courseInstructor")
  }

  const viewAllRequestsClick=()=>{
    history.push("/viewAllRequests")
  }

  const viewSlotLinkingClick =()=>{
    history.push("/viewSlotLinking")
  }
  const viewNotificationsClick =()=>{
    history.push("/viewNotifications")
  }

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
    <div>

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
  <Table>
    <tbody className="MainAcademicTable">
      <td className="MainAcademicTableColumn1">
        <tr className="MainAcademicList">
        <tr >
          <p className="MainAcademicListFont" onClick={viewScheduleClick}>View Schedule</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={viewNotificationsClick}>View Notifications </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={viewAllRequestsClick}>View All Submited Requests</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={viewSentReplacmentsClick}>view Sent Replacement Requests </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={viewRecievedReplacmentsClick}>view Recieved Replacement Requests </p>
        </tr>
       
        <tr>
          <p className="MainAcademicListFont"onClick={()=>{ setSendReplacement(true)}}>send Replacement Request</p>
        </tr>
       
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendSlot(true)}}>Send Slot-Linking Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendDayOff(true)}}> Send Change Day Off Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendMetrinity(true)}}>Send Matrenity Leave  Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendAnnual(true)}}>Send Annual Leave  Requests </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendSick(true)}}>Send Sick Leave Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendAccidental(true)}}>Send Accidental Leave Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setSendCompensation(true)}}>Send Compensation Leave Request </p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={viewSlotLinkingClick}>View SlotLinking Requests</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setAddSlot(true)}}>Add Slot</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setUpdateSlot(true)}}>Update Slot</p>
        </tr>
        <tr>
          <p className="MainAcademicListFont" onClick={()=>{setDeleteSlot(true)}}>Delete Slot</p>
            </tr>
            <tr>
          <p className="MainAcademicListFont" onClick={HODClick}>HOD Main </p>
            </tr>
            <tr>
          <p className="MainAcademicListFont" onClick={InstructorClick}>Instructor Main </p>
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
    <SendReplacementRequest show={sendReplacement} setShow={setSendReplacement}></SendReplacementRequest>
    <SendSlotLinking show={sendSlot} setShow={setSendSlot}></SendSlotLinking>
    <SendChangeDayOffRequest show= {sendDayyOff}  setShow={setSendDayOff} ></SendChangeDayOffRequest>
    <SendMetrinityLeave show= {sendMetrinity}  setShow={setSendMetrinity} ></SendMetrinityLeave>
    <SendSickLeave show= {sendSick}  setShow={setSendSick} ></SendSickLeave>
    <SendCompensationLeave  show={sendCompensation}  setShow={setSendCompensation}></SendCompensationLeave>
    <SendAccidentalLeave show={sendAccidental}  setShow={setSendAccidental}></SendAccidentalLeave>
    <SendAnnualLeave show ={sendAnnual} setShow={setSendAnnual}></SendAnnualLeave>
    <AddSlot show={addSlot} setShow={setAddSlot}></AddSlot>
    <UpdateSlot show={updateSlot} setShow={setUpdateSlot}></UpdateSlot>
    <DeleteSlot show={deleteSlot} setShow={setDeleteSlot}></DeleteSlot>
    </div>

    

  )
}
