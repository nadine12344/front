import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../Images/GUC.png'
import '../../Stylesheets/Rokaya/ViewSchedule.css'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/viewSentReplacementRequests.css'
import Table from 'react-bootstrap/Table'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import { useHistory } from 'react-router';






export default function ViewNotifications(props) {
  const [notification, setNotification] = useState([])
  const [modal, setModal] = useState(false);
  const [error,setError]=useState('')
  const toggle = () => {
      setModal(!modal)
      window.location.reload();
    };

    const history=useHistory()


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
  

  const  viewRequest=(r)=>{
   return(
       <div>
               <tr>
                   <td>
                       #
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                          <p>Request ID: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                            {r.request}
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                            <p>Message: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                           {r.message} 
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                            <p>Date Recieved: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                            {JSON.stringify(r.dateRecieved).substring(1,11)}
                   </td>
                   
       </tr>

       </div>
    
     
   )

   }
 

  useEffect( async () => {
       await axios({
                url: `${backendLink}/request/viewNotifications`,
                method: 'get',
                headers: {
                  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                  token:sessionStorage.getItem("token")
                 },
               
              }).then((res) => {
                  if(res.status===200){
               setNotification(res.data.notifications)
              // console.log(res.data.requests)
                  }
              }).catch((err) => {
                  console.log(err.response)
                })
              }
              ,[])

  return (
      <div>

        <img className="viewScheduleLogo" src={logo} alt="Logo" />
        <i className="fa fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
          <p className="viewScheduleHeaders">Notifications</p>
          <Table  striped>
           <tbody>
            {
              notification.map((r)=>{
                  return(
                  viewRequest(r)
                  )
              })
          
            } 
              </tbody>
       </Table>        
</div>

  )
}
