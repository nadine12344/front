import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../Images/GUC.png'
import '../../Stylesheets/Rokaya/ViewSchedule.css'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/viewSentReplacementRequests.css'
import Table from 'react-bootstrap/Table'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button, Card,Media} from 'reactstrap'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import {FormGroup,Input,Label,Form,FormText} from 'reactstrap'
import { useHistory } from 'react-router'




var success=0;


export default function ViewProfile(props) {
  const [profile,setProfile]=useState([])

  const [notifications,setNotifications]=useState([])
  const [noti,setNoti]=useState(false)
  const toggle5 = () => {
    setNoti(!noti)
    setNotifications([])
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



  useEffect( async () => {
    await axios({
             url: `${backendLink}/staff/viewProfile`,
             method: 'get',
             headers: {
               // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
               token:sessionStorage.getItem("token")
              },
            
           }).then((res) => {
               if(res.data.statusCode==1){
                 setProfile(res.data.userAcdemicMember)
               }

               if(res.data.statusCode==2){
                setProfile(res.data.userHrStaff)
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
           <p className="viewScheduleHeaders">My Profile</p>

<Card className="viewProfileCard"  style={{backgroundColor:'beige'}}>
<Media >
        <Media object data-src="holder.js/64x64" alt="photo" />
      <Media body>
          <Table className="viewProfileTable" style={{backgroundColor:'beige'}}>
              <tbody>
                  <tr className="viewProfileTable">
                     
                      <td className="viewProfileHeading viewProfileTable">
                      Email:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.email}
                      </td>
                      <td className="viewProfileHeading viewProfileTable">
                      ID:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.id}
                      </td>
                     
                  </tr>

                  {/* <tr className="viewProfileTable">
                      <td className="viewProfileHeading viewProfileTable">
                      ID:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.id}
                      </td>
                  </tr> */}

                  <tr className="viewProfileTable">
                  <td className="viewProfileHeading viewProfileTable">
                      Departement:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.departement}
                      </td>
                      <td className="viewProfileHeading viewProfileTable">
                      Courses:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {JSON.stringify(profile.courses)}
                      </td>
                  </tr>



                  <tr className="viewProfileTable">
                      <td className="viewProfileHeading viewProfileTable">
                      Salary:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.salary}
                      </td>

                      <td className="viewProfileHeading viewProfileTable">
                      Office Location:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.officeLocation}
                      </td>
                  </tr>


                  <tr className="viewProfileTable">
                      <td className="viewProfileHeading viewProfileTable">
                      Day Off:
                      </td>
                      <td className="viewProfileData viewProfileTable">
                      {profile.dayOff}
                      </td>
                  </tr>
              </tbody>
          </Table>
      </Media>
    </Media>
</Card>
</div>

  )
}

