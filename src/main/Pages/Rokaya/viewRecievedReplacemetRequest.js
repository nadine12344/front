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
import { useHistory } from 'react-router'







export default function ViewRecievedReplacements(props) {
  const [requests, setRequests] = useState([])
  const [modal, setModal] = useState(false);
  const [error,setError]=useState('')

  const [notifications,setNotifications]=useState([])
  const [noti,setNoti]=useState(false)
  const toggle5 = () => {
    setNoti(!noti)
    setNotifications([])
    window.location.reload();
  };

  const history=useHistory()
  const toggle = () => {
      setModal(!modal)
      window.location.reload();
    };

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
  
    
const  handleAcceptRequest= async(x)=>{
   
    setModal(!modal)
  await axios({
      url: `${backendLink}/request/acceptReplacementRequest`,
      method: 'post',
      headers: {
        // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
        token:sessionStorage.getItem("token")
       },
      data: {
           request:x,
          },
     
    }).then((res) => {
        setError(res.data.msg)
    }).catch((err) => {
        console.log(err.response)
      })


     
  }


  const  handleRejectRequest= async(x)=>{
   
    setModal(!modal)
  await axios({
      url: `${backendLink}/request/rejectReplacementRequest`,
      method: 'post',
      headers: {
        // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
        token:sessionStorage.getItem("token")
       },
      data: {
           request:x,
          },
     
    }).then((res) => {
       // console.log(res)
       setError(res.data.msg)
    }).catch((err) => {
        console.log(err.response)
      })


     
  }


  const  viewRequest=(r)=>{
   return(
       <div>
               <tr>
                   <td>
                       #
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                          <p>From: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                            {r.from}
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                            <p>Status: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                           {r.status} 
                   </td>

                   <td className="viewSentReplacementRequestTextTitle">
                            <p>Slot: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                           {r.slot} 
                   </td>
                   {(r.reason && r.reason!=null)?<><td className="viewSentReplacementRequestTextTitle">
                          <p>Reason: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                   {JSON.stringify(r.reason).substring(1,11)}
                   </td></>:(<></>)}
                   <td className="viewSentReplacementRequestTextTitle">
                          <p>Date Of Request: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                            {r.dateOfRequest}
                   </td>
                   <td className="viewSentReplacementRequestTextTitle">
                               <p>Date Submitted: </p>
                   </td>
                   <td className="viewSentReplacementRequestTextData">
                             {r.dateSubmitted}
                   </td>

                   <td>
                   <i className="fa fa-close closeIcon" onClick={()=>handleRejectRequest(r._id)}></i>
                   <i className="fa fa-check checkIcon" onClick={()=>handleAcceptRequest(r._id)}></i>

                   </td>

       </tr>


       <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>NOTE</ModalHeader>
    <ModalBody>
    {/* {JSON.stringify(error).substring(1,error.length-1)} */}
    {error}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>Ok</Button>
    </ModalFooter>
  </Modal>

       </div>
    
     
   )

   }
 

  useEffect( async () => {
       await axios({
                url: `${backendLink}/request/viewRecievedReplacementRequest`,
                method: 'get',
                headers: {
                  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
                  token:sessionStorage.getItem("token")
                 },
               
              }).then((res) => {
                  if(res.status===200){
               setRequests(res.data.requests)
              // console.log(res.data.requests)
                  }
              }).catch((err) => {
                  console.log(err.response)
                })
              }
              ,[])



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
        <img className="viewScheduleLogo" src={logo} alt="Logo" />
        <i className="fa fa-sign-out fa-lg sign-out-ALL" onClick={logoutClick}></i>
          <p className="viewScheduleHeaders">Requests</p>
          <Table  striped>
           <tbody>
            {
              requests.map((r)=>{
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
