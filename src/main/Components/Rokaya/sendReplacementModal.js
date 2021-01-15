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
import {FormGroup,Input,Label,Form,FormText} from 'reactstrap'

var success=0;



export default function SendReplacementRequest(props) {

 

  
  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
    slot: '',
    member: '',
    reason: '',
    date:'',
  })

  const handleChange = (event) => {
    let newValue = event.target.value
    let name = event.target.name
    // setError('')
    setState((prevState) => {
      return {
        ...prevState,
        [name]: newValue,
      }
    })
  }
  const toggle = () => {
    setError('')
    setState({
      slot: '',
      member: '',
      reason: '',
      date:'',
     })
    props.setShow(!props.show)
    };

    const toggle2 = () => {
      console.log("toggle2")
      console.log(success)
       setModal(!modal)
       if(success===1){
         console.log("yaay")
       props.setShow(!props.show)
       setState({
        slot: '',
        member: '',
        reason: '',
        date:'',
       })
       }
        };

    const handleSubmit= async ()=>{
        setModal(!modal)
      
        await axios({
            url: `${backendLink}/request/sendReplacementRequest`,
            method: 'post',
            headers: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            },
            data:{
                   to:state.member,
                   slot:state.slot,
                   reason:state.reason,
                   dateOfRequest:state.date
            },

           
          }).then((res) => {
             console.log("tatata")
              if(res.data.statusCode===2 || res.data.statusCode===1){
                success=0
                  console.log("gwa iff")
                  console.log(res)
                  setError(res.data.error)

              }
              else{
                console.log("successsssssss")
                success=1
                  setError(res.data.msg)
                  
              }
              
          }).catch((err) => {
            console.log("errrrrrooooooor")
            console.log(err)
              console.log(err.response)
            })

            // if(success==1){
            //   props.setShow(!props.show)
            // }

           // props.setShow(!props.show)

    }

  return (
      <div>
  <Modal isOpen={modal} toggle={toggle2}>
    <ModalHeader toggle={toggle2}>Take Care</ModalHeader>
    <ModalBody>
    {/* {JSON.stringify(error).substring(1,error.length-1)} */}
    {error}
   
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle2}>Ok</Button>
    </ModalFooter>
  </Modal>

<Modal  isOpen={props.show} toggle={toggle} className="sendReplacementModal">
<ModalHeader toggle={toggle} className="sendReplacementHeaderFont">Send Replacemet Request</ModalHeader>
<ModalBody>
<Form>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">To *</Label>
    <Input  className="sendReplacementInput"  name='member'  onChange={handleChange} placeholder="Id of academic member you want to replace with " />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword" className="sendReplacementTitleFont">Slot Id *</Label>
    <Input  className="sendReplacementInput"  onChange={handleChange} name='slot' />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Date Of Request * </Label>
    <Input  className="sendReplacementInput"  name='date'  onChange={handleChange} placeholder="date of the request " />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Reason For Replacement</Label>
    <Input className="sendReplacementTextInput" type="textarea" placeholder="Optional Reason" name='reason'  onChange={handleChange}/>
  </FormGroup>
  
   
</Form>
<Button color="primary" onClick={handleSubmit} className="sendReplacementButton" >Submit</Button>
</ModalBody>
{/* <ModalFooter>
     
    </ModalFooter> */}
</Modal>
</div>

  )
}

