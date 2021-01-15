import React,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../Images/GUC.png'
import '../../Stylesheets/Rokaya/ViewSchedule.css'
import '../../Stylesheets/Rokaya/MainAcademic.css'
import '../../Stylesheets/Rokaya/viewSentReplacementRequests.css'
import Table from 'react-bootstrap/Table'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button, Card} from 'reactstrap'
import axios from 'axios'
import {backendLink} from '../../keys_dev'
import {FormGroup,Input,Label,Form,FormText} from 'reactstrap'
import { useHistory } from 'react-router'



var success=0;


export default function Login(props) {

  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
    email: '',
    pass: '',
  })
  const history = useHistory()
  const toggle = () => {
    setModal(!modal)
    window.location.reload();
  };
  const handleChange = (event) => {
    let newValue = event.target.value
    let name = event.target.name
    setError('')
    setState((prevState) => {
      return {
        ...prevState,
        [name]: newValue,
      }
    })
  }
 

    const handleSubmit= async ()=>{


      console.log("BBBBBAAAAAAAAACCCCCCCCCCKKKKKKK EEEEEEEEEENNNNNNNNNDDDDDD LLLLLLLIIIIIINNNNKKKKK")
      console.log(backendLink)
        if(success!=1){
            setModal(!modal)
        }

        
        await axios({
            url: `${backendLink}/logging/login`,
            method: 'post',
            data:{
                   email:state.email,
                   password:state.pass,
            },

           
          }).then((res) => {
              console.log(res.data)
              if(res.data.statusCode===2 || res.data.statusCode===1){
                success=0
                  setError(res.data.error)
                  setModal(!modal)

              }
              else{
                  if(res.data.statusCode===5){
                      success=1;
                    history.push('/changePassword')
                    sessionStorage.setItem("token",res.data.token)
                    sessionStorage.setItem("type", res.data.type)
                  }
                  else{
                  success=1;
                  sessionStorage.setItem("token",res.data.token)
                  sessionStorage.setItem("type", res.data.type)
                
               setError(res.data.msg)
                  
                  history.push('/main')}
                  
              }
              
          }).catch((err) => {
              console.log(err.response)
            })

    }
        // await axios({
        //          url: `${backendLink}/logging/viewAcademic`,
        //          method: 'get',
        //          data:{
        //              id:
        //          }
                
        //        }).then((res) => {
        //          setRequests(res.data.requests)
        //        }).catch((err) => {
        //            console.log(err.response)
        //          })
        //        }
 

  return (
      <div>
           <img className="viewScheduleLogo" src={logo} alt="Logo" />

<Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Take Care</ModalHeader>
    <ModalBody>
    {/* {JSON.stringify(error).substring(1,error.length-1)} */}
    {error}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>Ok</Button>
    </ModalFooter>
  </Modal>

<Card className="loginCard">
<Form>
  <FormGroup>
    <Label for="examplePassword" className="sendReplacementTitleFont">Email *</Label>
    <Input  className="loginInput"  onChange={handleChange} name='email' />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Password *</Label>
    <Input className="loginInput"  name='pass'  type="password" onChange={handleChange}/>
  </FormGroup>
  
  <Button color="primary" onClick={handleSubmit} className="loginButton" >Login</Button>
</Form>
</Card>
</div>

  )
}

