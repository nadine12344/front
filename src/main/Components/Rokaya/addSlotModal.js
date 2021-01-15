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

var success=0




export default function AddSlot(props) {

  const [error,setError]=useState('')
  const [modal,setModal]=useState(false)
  const [state, setState] = useState({
    start: '',
    end: '',
    day: '',
    location:'',
    order:'',
    course:''
  })

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
  const toggle = () => {
    setError('')
    setState({
      start: '',
      end: '',
      day: '',
      location:'',
      order:'',
      course:''
    })
    props.setShow(!props.show)
    };

    const toggle2 = () => {
       setModal(!modal)
       if(success===1){
        props.setShow(!props.show)
        setState({
          start: '',
          end: '',
          day: '',
          location:'',
          order:'',
          course:''
        })
        }
        };

    const handleSubmit= async ()=>{
        console.log("state")
        console.log(state.start)
        setModal(!modal)
        await axios({
            url: `${backendLink}/request/addSlot`,
            method: 'post',
            headers: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlIjoiY29vcmRpbmF0b3IiLCJpYXQiOjE2MDkzNDA3MTR9.Gj-oLfyvDPDNY6f_PBmPuWU6_Ep8ZJtKc9h4NEBiAZE",
            },
            data:{
                   startTime:state.start,
                   endTime:state.end,
                   course:state.course,
                   day:state.day,
                   order:state.order,
                   location:state.location

            },

           
          }).then((res) => {
             // console.log(res)
              if(res.data.statusCode==2 || res.data.statusCode==1){
                success=0
                  setError(res.data.error)

              }
              else{
                success=1
                  setError(res.data.msg)
              }
              
          }).catch((err) => {
              console.log(err.response)
            })
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
<ModalHeader toggle={toggle} className="sendReplacementHeaderFont">Add Slot</ModalHeader>
<ModalBody>
<Form>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Start Time *</Label>
    <Input  className="sendReplacementInput"  name='start'  onChange={handleChange} placeholder="" />
  </FormGroup>
  <FormGroup>
    <Label for="examplePassword" className="sendReplacementTitleFont">End Time *</Label>
    <Input  className="sendReplacementInput"  onChange={handleChange} name='end' />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail" className="sendReplacementTitleFont">Order * </Label>
    <Input  className="sendReplacementInput"  name='order'  onChange={handleChange} placeholder="" />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Location *</Label>
    <Input  className="sendReplacementInput"  name='location'  onChange={handleChange} placeholder="" />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Day *</Label>
    <Input  className="sendReplacementInput"  name='day'  onChange={handleChange} placeholder="" />
  </FormGroup>
  <FormGroup>
    <Label for="exampleText" className="sendReplacementTitleFont">Course *</Label>
    <Input  className="sendReplacementInput"  name='course'  onChange={handleChange} placeholder="" />
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

